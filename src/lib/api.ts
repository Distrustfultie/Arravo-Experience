import { getToken } from "@/lib/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

type ApiEnvelope<T> = {
  message: string;
  data: T;
  statusCode: number;
};

type ApiErrorEnvelope = {
  message: string;
  error?: unknown;
  statusCode: number;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    // no JSON body
  }

  if (!response.ok) {
    const message =
      (body as ApiErrorEnvelope | null)?.message ??
      `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return (body as ApiEnvelope<T>).data;
}
