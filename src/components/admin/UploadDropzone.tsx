"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

export function UploadDropzone() {
  const [fileName, setFileName] = useState("");

  return (
    <label className="block cursor-pointer border border-dashed border-black/[0.16] bg-white p-7 transition hover:border-[#e30613] hover:bg-[#fffafa]">
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        className="sr-only"
        onChange={(event) =>
          setFileName(event.target.files?.[0]?.name ?? "")
        }
      />

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0ef] text-[#e30613]">
          <UploadCloud className="h-5 w-5" />
        </div>

        <div>
          <p className="font-bold">
            {fileName || "Upload employee list"}
          </p>

          <p className="mt-1 text-sm leading-6 text-neutral-500">
            CSV or Excel file containing employee ID, full name and company
            email.
          </p>

          {fileName && (
            <p className="mt-3 text-xs font-semibold text-green-700">
              File selected and ready for validation
            </p>
          )}
        </div>
      </div>
    </label>
  );
}