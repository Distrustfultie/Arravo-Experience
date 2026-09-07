import Button from "@/components/shared/Button";
import { CURRENT_EXPERIENCE, PLATFORM } from "@/lib/platform";

export function ExperienceHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-tomato-500 sm:h-80 sm:w-80" />
      <div className="absolute bottom-[-130px] left-[-100px] h-72 w-72 rounded-full border-[52px] border-black" />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-tomato-600">
            {PLATFORM.name} · {CURRENT_EXPERIENCE.label}
          </p>

          <h1 className="mt-5 text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            {CURRENT_EXPERIENCE.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            {CURRENT_EXPERIENCE.description}
          </p>

          <Button href="/discover" className="mt-8">
            {CURRENT_EXPERIENCE.actionLabel}
            <span className="ml-2">→</span>
          </Button>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Discover", "A simple, personal experience for every participant."],
            ["02", "Participate", "Purpose-built moments that bring people together."],
            ["03", "Celebrate", "A flexible platform for the things that make Arravo, Arravo."],
          ].map(([number, title, copy], index) => (
            <div
              key={title}
              className={`rounded-2xl p-5 ${
                index === 1 ? "bg-tomato-500 text-white" : "bg-black text-white"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">
                {number}
              </span>
              <p className="mt-8 text-lg font-black">{title}</p>
              <p className="mt-2 max-w-xs text-sm leading-5 opacity-70">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
