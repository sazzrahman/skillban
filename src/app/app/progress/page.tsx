import Navbar from "@/components/Navbar";

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="card flex max-w-lg flex-col items-center justify-center p-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-text-primary">Progress History</h2>
          <p className="mb-8 text-lg text-text-secondary">
            Detailed concept breakdown and history coming soon!
          </p>
          <div className="text-6xl">🚧</div>
        </div>
      </main>
    </div>
  );
}
