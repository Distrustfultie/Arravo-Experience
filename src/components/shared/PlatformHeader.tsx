import Link from "next/link";
import { PLATFORM } from "@/lib/platform";
import { Container } from "@/components/shared/Container";

export function PlatformHeader({ admin = false }: { admin?: boolean }) {
  return (
    <header className="border-b border-neutral-100 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href={admin ? "/admin/dashboard" : "/"} className="inline-flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-tomato-500 text-sm font-black text-white">A</span>
          <span className="text-sm font-black tracking-tight">{PLATFORM.name}</span>
        </Link>
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
            {PLATFORM.eyebrow}
          </p>
          <p className="mt-0.5 text-xs font-bold text-neutral-700">
            {admin ? "Admin workspace" : "People experience"}
          </p>
        </div>
      </Container>
    </header>
  );
}
