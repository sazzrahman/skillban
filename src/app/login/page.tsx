import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="card w-full max-w-md p-8">
        <h2 className="mb-6 text-2xl font-bold text-center">Welcome Back</h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-secondary" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="falcon@example.com" className="input-field" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-secondary" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" className="input-field" />
          </div>
          <Link href="/app/dashboard" className="btn-primary text-center mt-4">
            Log in
          </Link>
        </form>
        <p className="mt-4 text-center text-sm text-secondary">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}