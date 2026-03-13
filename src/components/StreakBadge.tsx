import { Flame } from "lucide-react";

export default function StreakBadge({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1 font-semibold text-secondary shadow-sm">
      <Flame className="h-4 w-4 text-warning" />
      <span>{count}</span>
    </div>
  );
}