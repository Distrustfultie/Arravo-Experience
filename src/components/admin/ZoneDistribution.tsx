const zones = [
  ["NORTH", 107],
  ["SOUTHWEST", 107],
  ["SOUTHEAST", 107],
  ["SOUTH-SOUTH", 106],
] as const;

export function ZoneDistribution() {
  return (
    <section className="border border-black/[0.08] bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Allocation overview
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.04em]">
            Balanced across four zones
          </h2>
        </div>

        <span className="hidden text-xs font-medium text-neutral-400 sm:block">
          427 participants
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {zones.map(([zone, count]) => (
          <div key={zone}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{zone}</p>

              <p className="text-sm font-medium text-neutral-500">
                {count}
              </p>
            </div>

            <div className="mt-3 h-1.5 bg-neutral-100">
              <div
                className="h-full bg-[#e30613]"
                style={{
                  width: `${(count / 107) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}