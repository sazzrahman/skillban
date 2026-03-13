import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-12">
      <Link href="/app/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm text-secondary hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>
      <div className="card p-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-primary">Detailed Progress</h2>
        <p className="text-secondary">
          This page will show detailed concept breakdowns, history, and learning curves.
        </p>
      </div>
    </div>
  );
}