"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import PublicHeader from "@/components/shared/PublicHeader";

export default function DiscoverPage() {
  const [fullName, setFullName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!fullName.trim() || !companyEmail.trim()) {
      setError("Please enter your full name and company email.");
      return;
    }

    if (!companyEmail.includes("@")) {
      setError("Please enter a valid company email address.");
      return;
    }

    setIsLoading(true);

    /*
     * Temporary frontend demo.
     *
     * Replace this with the backend verification request:
     *
     * POST /api/public/experiences/mosaic-2026/verify
     *
     * The backend should verify the employee and return a secure
     * participant/session reference. It should not expose the assignment
     * directly at this stage.
     */

    sessionStorage.setItem(
      "arravo_participant",
      JSON.stringify({
        fullName: fullName.trim(),
        companyEmail: companyEmail.trim().toLowerCase(),
      })
    );

    setTimeout(() => {
      window.location.href = "/reveal";
    }, 500);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f6f2] text-black">
      <PublicHeader />

      <section className="relative isolate">
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#e30613]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1fr] lg:px-12 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e30613]">
              Discover your experience
            </p>

            <h1 className="mt-6 text-[3.2rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">
              Let’s find
              <br />
              your place.
            </h1>

            <p className="mt-7 max-w-md text-lg leading-8 text-black/60">
              Enter your details to verify your employee profile and discover
              the experience prepared for you.
            </p>

            <div className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-5">
              <p className="text-sm font-bold">What you need</p>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Your full name and official Arravo company email address.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                Employee verification
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                Enter your details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-bold"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] px-11 py-4 text-sm outline-none transition focus:border-[#e30613] focus:ring-4 focus:ring-[#e30613]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="companyEmail"
                  className="mb-2 block text-sm font-bold"
                >
                  Company email
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />

                  <input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={(event) => setCompanyEmail(event.target.value)}
                    placeholder="name@arravo.com"
                    className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] px-11 py-4 text-sm outline-none transition focus:border-[#e30613] focus:ring-4 focus:ring-[#e30613]/10"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#e30613] px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#c90511] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Verifying..." : "Continue"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-black/40">
              Your details are used only to verify your employee profile for
              this experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}