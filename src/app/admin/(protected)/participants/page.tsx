"use client";

import { useMemo, useState } from "react";
import { Search, Upload, Users, X } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { UploadDropzone } from "@/components/admin/UploadDropzone";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ApiError } from "@/lib/api";
import { parseStaffCsv } from "@/lib/csv";
import { bulkUploadStaff } from "@/lib/staff";
import { useStaff } from "@/lib/useStaff";

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const { staff, total, isLoading, error, refetch } = useStaff();

  const participants = useMemo(() => {
    const searchValue = query.toLowerCase().trim();

    if (!searchValue) {
      return staff;
    }

    return staff.filter((person) =>
      `${person.fullName} ${person.email ?? ""} ${person.zoneDisplay}`
        .toLowerCase()
        .includes(searchValue)
    );
  }, [query, staff]);

  async function handleFile(file: File) {
    setUploadMessage(null);
    setIsUploading(true);

    try {
      const text = await file.text();
      const items = parseStaffCsv(text);

      const uploadedCount = await bulkUploadStaff(items);

      setUploadMessage({
        tone: "success",
        text: `Added ${uploadedCount} ${uploadedCount === 1 ? "person" : "people"} to the list.`,
      });

      await refetch();
    } catch (err) {
      setUploadMessage({
        tone: "error",
        text:
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Could not process that file.",
      });
    } finally {
      setIsUploading(false);
    }
  }

  const assignedCount = staff.filter((person) => person.zone).length;
  const zonesInUse = new Set(
    staff.filter((person) => person.zone).map((person) => person.zone)
  ).size;

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-tomato-600">
            People
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.055em] text-neutral-950 sm:text-5xl">
            Who’s taking part?
          </h1>

          <p className="mt-3 max-w-xl text-sm text-neutral-500">
            Add and manage the employees taking part in this experience.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUpload((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          {showUpload ? (
            <>
              <X className="h-4 w-4" />
              Close
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Add participants
            </>
          )}
        </button>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              People taking part
            </p>

            <Users className="h-4 w-4 text-neutral-300" />
          </div>

          <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
            {total}
          </p>
        </div>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <p className="text-sm text-neutral-500">
            People assigned
          </p>

          <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
            {assignedCount}
          </p>
        </div>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <p className="text-sm text-neutral-500">
            Zones in use
          </p>

          <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
            {zonesInUse}
          </p>
        </div>
      </div>

      {showUpload && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[22px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)] sm:p-6">
            <UploadDropzone onFile={handleFile} isUploading={isUploading} />

            {uploadMessage && (
              <p
                className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                  uploadMessage.tone === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {uploadMessage.text}
              </p>
            )}

            <div className="mt-4 rounded-[18px] bg-neutral-950 p-5 text-sm leading-6 text-neutral-300">
              <strong className="font-semibold text-white">
                CSV columns
              </strong>

              <p className="mt-2">
                First Name · Last Name · Email (optional)
              </p>

              <p className="mt-4 text-xs leading-5 text-neutral-500">
                We’ll check the file for missing names before adding anyone
                to the list. The server assigns everyone a balanced zone.
              </p>
            </div>
          </div>

          <div className="rounded-[22px] bg-white p-6 shadow-[0_2px_14px_rgba(20,20,20,0.035)] sm:p-7">
            <p className="text-sm font-semibold text-neutral-950">
              How it works
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-[-0.045em]">
              Add people to the list.
            </h2>

            <div className="mt-7 space-y-5">
              {[
                "Upload the approved employee CSV.",
                "We’ll check the names and emails.",
                "The server assigns each person a balanced zone.",
                "The list updates automatically.",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-600">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm text-neutral-600">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="mt-8 overflow-hidden rounded-[22px] bg-white shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-black tracking-[-0.03em]">
              People on the list
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Showing {participants.length} of {staff.length} people
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email or zone..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-y border-neutral-100 bg-neutral-50/70 text-xs font-semibold text-neutral-500">
              <tr>
                <th className="px-6 py-3.5">Participant</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Assignment</th>
                <th className="px-6 py-3.5">Role</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-950">
                      {person.fullName}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    {person.email || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-800">
                      {person.zoneDisplay || "Not assigned"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge tone="neutral">{person.role}</StatusBadge>
                  </td>
                </tr>
              ))}

              {!isLoading && participants.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-neutral-500"
                  >
                    {error || "No participants match your search."}
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-neutral-500"
                  >
                    Loading participants...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
}
