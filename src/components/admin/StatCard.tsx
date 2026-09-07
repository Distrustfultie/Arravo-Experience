export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="border-b border-black/[0.08] pb-5">
      <p className="text-sm font-medium text-neutral-500">{label}</p>

      <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-black">
        {value}
      </p>

      {note && (
        <p className="mt-2 text-xs text-neutral-500">
          {note}
        </p>
      )}
    </div>
  );
}