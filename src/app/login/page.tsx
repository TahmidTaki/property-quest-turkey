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

  // Already logged in → straight to the portal.
  if (session) {
    redirect(next?.startsWith("/portal") ? next : "/portal");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-canvas px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 block text-center text-xl font-extrabold text-navy"
        >
          Property<span className="text-red">Quest</span>Turkey
        </Link>
        <div className="card p-8">
          <h1 className="text-2xl text-navy">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted">
            Log in to view your portfolio, citizenship progress, and documents.
          </p>

          <div className="mt-4 rounded-lg border border-gold/40 bg-gold-soft/50 p-3 text-xs text-ink/80">
            <strong>Preview mode:</strong> enter any email to explore the client
            portal on sample data. Secure client accounts activate with the full
            launch.
          </div>

          <div className="mt-6">
            <LoginForm next={next} />
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-muted">
          New to PQT?{" "}
          <Link href="/contact" className="font-semibold text-navy hover:underline">
            Book a consultation
          </Link>
        </p>
      </div>
    </div>
  );
}
