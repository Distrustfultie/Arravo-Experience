import Button from "@/components/shared/Button";

export function MosaicHero() {
    const zones = [
        "NORTH",
        "SOUTHWEST",
        "SOUTHEAST",
        "SOUTH-SOUTH"
    ];

    return <section className="relative overflow-hidden">
        <div className="absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-tomato-500" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
            <p className="text-xs font-black uppercase tracking-[.25em] text-tomato-600">Arravo Mosaic 2026</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">One Arravo.<br />
                <span className="text-tomato-500">Four zones.
                </span><br />One Mosaic.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">Celebrate the cultures, traditions, identities and perspectives that make us who we are. Discover the geopolitical zone you’ll be representing.</p>
            <Button href="/discover" className="mt-8">Discover My Zone <span className="ml-2">→</span></Button>
            <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {zones.map((z, i) => <div key={z} className={`rounded-2xl p-5 ${i % 2 === 0 ? "bg-black" : "bg-tomato-500"} text-white`}>
                    <span className="text-[10px] font-bold uppercase tracking-[.18em] opacity-70">Zone 0{i + 1}</span>
                    <p className="mt-8 text-lg font-black">{z}</p>
                </div>
                )}</div>
        </div>
    </section>
}