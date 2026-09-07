"use client";

import { useMemo, useState } from "react";
import { Search, Upload, Users, X } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { UploadDropzone } from "@/components/admin/UploadDropzone";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockEmployees } from "@/lib/mock";

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const participants = useMemo(() => {
    const searchValue = query.toLowerCase().trim();

    if (!searchValue) {
      return mockEmployees;
    }

    return mockEmployees.filter((employee) =>
      `${employee.fullName} ${employee.companyEmail} ${employee.employeeId} ${employee.zone}`
        .toLowerCase()
        .includes(searchValue)
    );
  }, [query]);

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
            {mockEmployees.length}
          </p>
        </div>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <p className="text-sm text-neutral-500">
            People assigned
          </p>

          <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
            {mockEmployees.filter((employee) => employee.zone).length}
          </p>
        </div>

        <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)]">
          <p className="text-sm text-neutral-500">
            Results opened
          </p>

          <p className="mt-5 text-3xl font-black tracking-[-0.05em]">
            {mockEmployees.filter((employee) => employee.discovered).length}
          </p>
        </div>
      </div>

      {showUpload && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[22px] bg-white p-5 shadow-[0_2px_14px_rgba(20,20,20,0.035)] sm:p-6">
            <UploadDropzone />

            <div className="mt-4 rounded-[18px] bg-neutral-950 p-5 text-sm leading-6 text-neutral-300">
              <strong className="font-semibold text-white">
                CSV columns
              </strong>

              <p className="mt-2">
                Employee ID · Full Name · Company Email
              </p>

              <p className="mt-4 text-xs leading-5 text-neutral-500">
                We’ll check the file for missing details and duplicate
                records before adding anyone to the list.
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
                "We’ll check the names, emails and employee IDs.",
                "Review any missing or duplicate records.",
                "Confirm the import.",
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
              Showing {participants.length} of {mockEmployees.length} people
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email or employee ID..."
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
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-950">
                      {employee.fullName}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {employee.employeeId}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    {employee.companyEmail}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-800">
                      {employee.zone || "Not assigned"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      tone={employee.discovered ? "success" : "neutral"}
                    >
                      {employee.discovered ? "Completed" : "Not viewed"}
                    </StatusBadge>
                  </td>
                </tr>
              ))}

              {participants.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-neutral-500"
                  >
                    No participants match your search.
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