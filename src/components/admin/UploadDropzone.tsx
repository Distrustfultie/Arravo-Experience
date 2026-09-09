"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

export function UploadDropzone({
  onFile,
  isUploading,
}: {
  onFile: (file: File) => void;
  isUploading?: boolean;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <label className="block cursor-pointer border border-dashed border-black/[0.16] bg-white p-7 transition hover:border-[#e30613] hover:bg-[#fffafa]">
      <input
        type="file"
        accept=".csv"
        className="sr-only"
        disabled={isUploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;

          setFileName(file.name);
          onFile(file);
          event.target.value = "";
        }}
      />

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0ef] text-[#e30613]">
          <UploadCloud className="h-5 w-5" />
        </div>

        <div>
          <p className="font-bold">
            {isUploading
              ? "Uploading..."
              : fileName || "Upload employee list"}
          </p>

          <p className="mt-1 text-sm leading-6 text-neutral-500">
            CSV file containing first name, last name and (optional) company
            email.
          </p>
        </div>
      </div>
    </label>
  );
}
