import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-2xl">
        <div className="mb-4 inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-medium text-secondary">
          AI-powered adaptive learning
        </div>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-text-primary">
          Learn to code by doing.{" "}
          <span className="text-primary">AI adapts to you.</span>
        </h1>
        <p className="mb-8 text-lg text-text-secondary">
          Skillban meets you where you are. No passive reading — just hands-on challenges
          that evolve with your learning style, in real time.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-8 py-3 font-semibold text-text-secondary transition-colors hover:border-primary hover:text-text-primary"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
