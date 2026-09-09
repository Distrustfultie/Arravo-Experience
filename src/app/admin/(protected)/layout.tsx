"use client";

import { useEffect, useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import { getToken } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/admin/login";
      return;
    }

    setIsChecking(false);
  }, []);

  if (isChecking) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
