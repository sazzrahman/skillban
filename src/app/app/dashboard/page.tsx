import Link from "next/link";
import SkillMap from "@/components/SkillMap";
import { Play } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-12">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="card overflow-hidden bg-surface-raised p-8 text-center sm:text-left">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-primary">Ready for your next challenge?</h2>
            <div className="mb-6 flex flex-col items-center gap-2 sm:flex-row">
              <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-secondary">
                Topic: Closures 🎯
              </span>
              <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-secondary">
                Difficulty: ★★☆☆☆
              </span>
            </div>
            <Link href="/app/challenge" className="btn-primary inline-flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Challenge
            </Link>
          </div>
        </div>
        <div className="md:col-span-4">
          <SkillMap />
        </div>
      </div>
    </div>
  );
}