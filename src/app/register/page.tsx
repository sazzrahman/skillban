import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md space-y-8 p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <Link href="/app/dashboard" className="btn-primary flex w-full justify-center text-center py-3 text-lg">
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
