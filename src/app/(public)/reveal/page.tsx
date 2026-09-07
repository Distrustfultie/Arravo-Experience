"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import PublicHeader from "@/components/shared/PublicHeader";

export default function RevealPage() {
  const [participantName, setParticipantName] = useState("");

  useEffect(() => {
    const storedParticipant = sessionStorage.getItem("arravo_participant");

    if (!storedParticipant) {
      window.location.href = "/discover";
      return;
    }

    const participant = JSON.parse(storedParticipant);
    setParticipantName(participant.fullName);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f6f2] text-black">
      <PublicHeader />

      <section className="relative flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e30613]/10 blur-3xl" />

        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e30613] text-white shadow-xl shadow-[#e30613]/20">
            <Sparkles className="h-7 w-7" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#e30613]">
            Your experience is ready
          </p>

          <h1 className="mt-5 text-[3.2rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">
            Almost there,
            <br />
            {participantName || "there"}.
          </h1>

          <p className="mx-auto mt-7 max-w-md text-lg leading-8 text-black/60">
            Your experience has been prepared. When you are ready, reveal what
            awaits you.
          </p>

          <Link
            href="/result"
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1"
          >
            Reveal my experience
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}