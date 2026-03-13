import Link from "next/link";
import Navbar from "@/components/Navbar";
import SkillMap from "@/components/SkillMap";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <SkillMap />
          </div>
          
          <div className="card flex w-full max-w-md flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary">Ready for your next challenge?</h2>
            
            <div className="my-8 flex w-full flex-col gap-2 rounded-lg bg-surface-raised p-6 text-left">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-secondary">Topic:</span>
                <span className="text-lg font-bold text-primary">Closures 🎯</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-secondary">Difficulty:</span>
                <span className="text-secondary">★★☆☆☆</span>
              </div>
            </div>
            
            <Link href="/app/challenge" className="btn-primary w-full py-3 text-lg">
              Start Challenge
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
