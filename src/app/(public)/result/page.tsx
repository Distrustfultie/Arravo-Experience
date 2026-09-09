"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import PublicHeader from "@/components/shared/PublicHeader";

export default function ResultPage() {
  const [participantName, setParticipantName] = useState("");
  const [zoneDisplay, setZoneDisplay] = useState("");

  useEffect(() => {
    const storedParticipant = sessionStorage.getItem("arravo_participant");

    if (!storedParticipant) {
      window.location.href = "/discover";
      return;
    }

    const participant = JSON.parse(storedParticipant);
    setParticipantName(participant.fullName);
    setZoneDisplay(participant.zoneDisplay);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f6f2] text-black">
      <PublicHeader />

      <section className="relative isolate flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-20">
        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#e30613]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="w-full max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e30613] text-white shadow-xl shadow-[#e30613]/20">
              <Sparkles className="h-7 w-7" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#e30613]">
              Your experience
            </p>

            <h1 className="mt-5 text-[3.2rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">
              Welcome,
              <br />
              {participantName || "Arravo colleague"}.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-black/60">
              Your assigned experience is waiting for you.
            </p>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-black p-8 text-white shadow-2xl sm:p-12">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e30613]/30 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="h-5 w-5" />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Your assigned zone
                </span>
              </div>

              <h2 className="mt-8 text-5xl font-black uppercase tracking-[-0.07em] sm:text-7xl">
                {zoneDisplay || "—"}
              </h2>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                  What happens next?
                </p>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  More information about your group, activities and
                  participation details will appear here.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-black/50 transition-colors hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}