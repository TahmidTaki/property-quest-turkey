import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/forms/SignupForm";
import { getSession } from "@/lib/auth/demo-session";

export const metadata: Metadata = {
  title: "Join PQT Today",
  description: "Create your account and unlock exclusive property opportunities in Turkey.",
};

export default async function SignupPage() {
  const session = await getSession();

  if (session) {
    redirect("/portal");
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
          <h1 className="text-2xl font-bold text-navy dark:text-blue-300">Join PQT Today</h1>
          <p className="mt-1.5 text-sm text-muted dark:text-dark-muted">
            Create your account in minutes and unlock exclusive property opportunities in Turkey.
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-dark-text">
              <span className="text-gold dark:text-yellow-400">✔</span>
              <span>Access exclusive properties before others</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-dark-text">
              <span className="text-gold dark:text-yellow-400">✔</span>
              <span>Save your favorite properties</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-dark-text">
              <span className="text-gold dark:text-yellow-400">✔</span>
              <span>Get smart recommendations that match your goals</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-dark-text">
              <span className="text-gold dark:text-yellow-400">✔</span>
              <span>Enjoy a secure, seamless, and personalized experience</span>
            </div>
          </div>

          <div className="mt-6">
            <SignupForm />
          </div>

          <p className="mt-6 text-center text-sm text-muted dark:text-dark-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-navy hover:underline dark:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}