import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 text-2xl text-navy">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
