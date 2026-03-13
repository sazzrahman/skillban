import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="absolute top-6 left-6 text-xl font-bold tracking-tight text-text-primary">
        Skillban
      </div>
      <div className="absolute top-6 right-6 space-x-4">
        <Link href="/login" className="font-semibold text-text-secondary hover:text-text-primary">
          Log in
        </Link>
        <Link href="/register" className="btn-primary">
          Sign up
        </Link>
      </div>
      
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl">
          Learn to code by doing.
          <br />
          <span className="text-primary">AI adapts to you.</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-text-secondary sm:text-xl">
          Stop watching tutorials and start solving problems. The only coding platform that maps your knowledge and tailors challenges to your learning style.
        </p>
        <div className="mt-10">
          <Link href="/register" className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover">
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
