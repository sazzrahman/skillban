import Link from "next/link";
import StreakBadge from "./StreakBadge";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-border-color bg-surface px-6 py-4">
      <Link href="/app/dashboard" className="text-xl font-bold tracking-tight text-text-primary">
        Skillban
      </Link>
      
      <div className="flex items-center gap-6">
        <StreakBadge count={7} />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm">
          F
        </div>
      </div>
    </nav>
  );
}
