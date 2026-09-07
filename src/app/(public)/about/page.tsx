import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import PublicHeader from "@/components/shared/PublicHeader";
import { CURRENT_EXPERIENCE, PLATFORM } from "@/lib/platform";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f6f2] text-black">
      <PublicHeader />

      <section className="relative isolate">
        <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#e30613]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black/55">
              <Sparkles className="h-3.5 w-3.5 text-[#e30613]" />
              The platform behind the experience
            </div>

            <h1 className="max-w-3xl text-[3.2rem] font-black leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              One platform.
              <br />
              Many moments.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
              {PLATFORM.name} is Arravo’s flexible home for internal
              experiences, campaigns, people activities, announcements,
              recognition moments and more.
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-black/55">
              The platform makes it easier for employees to discover what is
              happening, participate in company activities and receive
              experiences designed around them.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#e30613] px-6 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-1"
              >
                Discover my experience
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/60 px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-white"
              >
                Back home
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#e30613]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-black p-7 text-white shadow-2xl sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e30613]/30 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  Current experience
                </p>

                <h2 className="mt-8 text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl">
                  {CURRENT_EXPERIENCE.name}
                </h2>

                <p className="mt-5 text-sm leading-6 text-white/60">
                  {CURRENT_EXPERIENCE.description}
                </p>

                <div className="mt-10 space-y-4 border-t border-white/10 pt-6">
                  {[
                    "Discover your assigned experience",
                    "Participate in the current activity",
                    "Stay connected to the Arravo community",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/75"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                        <Check className="h-3.5 w-3.5 text-[#ff716f]" />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl bg-white/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                    Built for
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Employees, teams and internal company experiences across
                    Arravo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}