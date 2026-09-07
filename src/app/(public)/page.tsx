import Link from "next/link";

import PageShell from "@/components/shared/PageShell";
import Button from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";
import { CURRENT_EXPERIENCE, PLATFORM } from "@/lib/platform";


export default function HomePage() {
  return (
    <PageShell>
      <section className="min-h-screen px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
        <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col sm:min-h-[calc(100vh-3.5rem)]">
          {/* Header */}
          <header className="flex items-center justify-between gap-4">
            <Logo href="/" imageClassName="h-7 sm:h-8" priority />

            <div className="max-w-[190px] truncate rounded-full border border-black/10 bg-white/60 px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-black/55 backdrop-blur-xl sm:max-w-none sm:px-4 sm:text-xs">
              {PLATFORM.name}
            </div>
          </header>

          {/* Main content */}
          <div className="grid flex-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24 xl:gap-24">
            {/* Left content */}
            <div className="min-w-0 max-w-3xl">
              <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#e30613]/15 bg-[#e30613]/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b5000b] sm:mb-8 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e30613] shadow-[0_0_0_5px_rgba(227,6,19,0.08)] sm:h-2 sm:w-2" />

                <span className="truncate">
                  {CURRENT_EXPERIENCE.label}
                </span>
              </div>

              <h1 className="max-w-4xl text-[3.2rem] font-black leading-[0.94] tracking-[-0.075em] text-black sm:text-6xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
                {CURRENT_EXPERIENCE.title}
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-black/60 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
                {CURRENT_EXPERIENCE.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <Link
                  href="/discover"
                  className="inline-flex items-center justify-center rounded-full bg-[#e30613] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1"
                >
                  Discover My Experience
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/60 px-6 py-4 text-sm font-bold text-black transition hover:bg-white"
                >
                  Explore the platform
                </Link>
              </div>
            </div>

            {/* Right experience card */}
            <div className="relative min-w-0">
              {/* Soft red glow */}
              <div className="absolute -inset-5 rounded-[2.5rem] bg-[#e30613]/10 blur-3xl sm:-inset-8 sm:rounded-[3rem]" />

              <div className="glass-surface relative overflow-hidden rounded-[1.75rem] p-3 sm:rounded-[2.5rem] sm:p-5">
                {/* Internal colour movement */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(227,6,19,0.18),transparent_30%),radial-gradient(circle_at_90%_90%,rgba(0,0,0,0.08),transparent_35%)]" />

                <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[1.35rem] bg-[#0b0b0b] p-6 text-white sm:min-h-[480px] sm:rounded-[2rem] sm:p-10">
                  {/* Decorative moving shapes */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#e30613]/20 blur-2xl" />

                  <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/[0.04] blur-2xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs sm:tracking-[0.2em]">
                      Current experience
                    </span>

                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#e30613] shadow-[0_0_25px_rgba(227,6,19,0.8)] sm:h-3 sm:w-3" />
                  </div>

                  <div className="relative my-12 sm:my-0">
                    <p className="mb-4 text-xs text-white/45 sm:text-sm">
                      {CURRENT_EXPERIENCE.accentLabel}
                    </p>

                    <h2 className="max-w-md text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl md:text-6xl">
                      Discover your
                      <span className="block text-[#e30613]">
                        next experience.
                      </span>
                    </h2>
                  </div>

                  <div className="relative flex items-end justify-between gap-5">
                    <p className="max-w-[210px] text-[11px] leading-5 text-white/45 sm:text-xs sm:leading-6">
                      One platform for Arravo’s internal moments, campaigns,
                      activities, and experiences.
                    </p>

                    <div className="shrink-0 text-4xl font-black tracking-[-0.08em] text-white/10 sm:text-5xl">
                      01
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex flex-col gap-3 border-t border-black/10 py-5 text-[10px] text-black/40 sm:flex-row sm:items-center sm:justify-between sm:py-6 sm:text-xs">
            <span>Powered by Arravo</span>

            <span>People. Experiences. One platform.</span>
          </footer>
        </div>
      </section>
    </PageShell>
  );
}