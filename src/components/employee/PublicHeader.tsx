import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";

export function PublicHeader() {
    return <header className="border-b border-neutral-100 bg-white/90">
        <Container className="flex h-16 items-center justify-between">
            <Logo />
            <span className="text-xs font-bold uppercase tracking-[.18em] text-neutral-500">
                Mosaic 2026
            </span>
        </Container>
    </header>
}