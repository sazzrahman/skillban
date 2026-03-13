import Link from "next/link";
import StreakBadge from "./StreakBadge";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Link href="/app/dashboard" className="text-xl font-bold tracking-tight text-primary">
          Skillban
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <StreakBadge count={7} />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised border border-border">
          <User className="h-5 w-5 text-secondary" />
        </div>
      </div>
    </header>
  );
}