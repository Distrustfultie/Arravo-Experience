"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Search,
  Users,
} from "lucide-react";

import { Container } from "@/components/shared/Container";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ZONE_CODES, ZONE_DISPLAY } from "@/lib/zones";
import { useStaff } from "@/lib/useStaff";

const zoneFilters = ["ALL", ...ZONE_CODES];

export default function AssignmentsPage() {
  const [query, setQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("ALL");

  const { staff, isLoading, error } = useStaff();

  const assignments = useMemo(() => {
    const searchValue = query.toLowerCase().trim();

    return staff.filter((person) => {
      const matchesSearch =
        !searchValue ||
        `${person.fullName} ${person.email ?? ""}`
          .toLowerCase()
          .includes(searchValue);

      const matchesZone =
        selectedZone === "ALL" || person.zone === selectedZone;

      return matchesSearch && matchesZone;
    });
  }, [query, selectedZone, staff]);

  const assignedCount = staff.filter((person) => person.zone).length;
  const zonesInUse = new Set(
    staff.filter((person) => person.zone).map((person) => person.zone)
  ).size;

  function exportAssignments() {
    const headers = ["Full Name", "Email", "Zone", "Role"];

    const rows = staff.map((person) => [
      person.fullName,
      person.email || "",
      person.zoneDisplay || "",
      person.role,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "arravo-mosaic-assignments.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-tomato-600">
            Team allocation
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.055em] text-neutral-950 sm:text-5xl">
            Who’s in which zone?
          </h1>

          <p className="mt-3 max-w-xl text-sm text-neutral-500">
            Review the final allocations and download the list when
            you’re ready.
          </p>
        </div>

        <button
          type="button"
          onClick={exportAssignments}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Download className="h-4 w-4" />
          Download list
        </button>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              People assigned
            </p>

            <Users className="h-4 w-4 text-neutral-300" />
          </div>

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

      <section className="mt-8 overflow-hidden rounded-[22px] bg-white shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-black tracking-[-0.03em]">
                Everyone’s assignment
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Assignments are made automatically when people are added.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {zoneFilters.map((zone) => {
              const isActive = selectedZone === zone;

              const label =
                zone === "ALL"
                  ? "Everyone"
                  : ZONE_DISPLAY[zone as keyof typeof ZONE_DISPLAY];

              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${isActive
                      ? "bg-neutral-950 text-white"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-950"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-y border-neutral-100 bg-neutral-50/70 text-xs font-semibold text-neutral-500">
              <tr>
                <th className="px-6 py-3.5">Employee</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Zone</th>
                <th className="px-6 py-3.5">Role</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((person) => (
                <tr
                  key={person.id}
                  className="border-t border-black/[0.06]"
                >
                  <td className="px-5 py-4">
                    <strong className="font-semibold">{person.fullName}</strong>
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {person.email || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold">
                      {person.zoneDisplay || "Not assigned"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge tone="neutral">{person.role}</StatusBadge>
                  </td>
                </tr>
              ))}

              {!isLoading && assignments.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-neutral-500"
                  >
                    {error || "No assignments match your search."}
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-neutral-500"
                  >
                    Loading assignments...
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
