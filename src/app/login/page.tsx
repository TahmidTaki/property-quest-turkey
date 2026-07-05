import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { getSession } from "@/lib/auth/demo-session";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Log in to your Property Quest Turkey client portal.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  const { next } = await searchParams;

  if (session) {
    redirect(next?.startsWith("/portal") ? next : "/portal");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-canvas px-5 py-16 dark:bg-dark-bg">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 block text-center text-2xl font-extrabold tracking-tight text-navy dark:text-blue-300"
        >
          Property<span className="text-red dark:text-red-400">Quest</span>Turkey
        </Link>
        <div className="card p-8 dark:bg-dark-card dark:border-dark-border">
          <h1 className="text-2xl font-bold text-navy dark:text-blue-300">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted dark:text-dark-muted">
            Enter your email and password to access your account
          </p>

          <div className="mt-4 rounded-lg border border-gold/40 bg-gold-soft/50 p-3 text-xs text-ink/80 dark:border-gold/30 dark:bg-gold/5 dark:text-dark-text">
            <strong>Preview mode:</strong> enter any email to explore the client
            portal on sample data. Secure client accounts activate with the full
            launch.
          </div>

          <div className="mt-6">
            <LoginForm next={next} />
          </div>

          <p className="mt-6 text-center text-sm text-muted dark:text-dark-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-navy hover:underline dark:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}