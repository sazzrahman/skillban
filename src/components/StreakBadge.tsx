export default function StreakBadge({ count = 7 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border-color bg-surface-raised px-3 py-1 text-sm font-semibold text-secondary shadow-sm">
      <span className="text-lg leading-none">🔥</span>
      <span>{count}</span>
    </div>
  );
}
