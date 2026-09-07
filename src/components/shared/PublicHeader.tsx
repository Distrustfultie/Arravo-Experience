import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function PublicHeader() {
  return (
    <header className="relative z-20 border-b border-black/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <Logo href="/" imageClassName="h-8" priority />
        </div>

        <nav className="flex items-center gap-5 text-sm font-semibold text-black/60">
          <Link
            href="/about"
            className="transition-colors hover:text-black"
          >
            About
          </Link>

          <Link
            href="/discover"
            className="rounded-full bg-black px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}