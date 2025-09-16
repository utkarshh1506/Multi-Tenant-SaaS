import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-azure-100">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white-700 mb-6">
          Simplify Your Notes, Securely
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          A modern multi-tenant note-taking app — stay organized across teams.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/auth?mode=login"
            className="px-6 py-3 bg-azure-600 text-white rounded-xl shadow hover:bg-azure-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth?mode=signup"
            className="px-6 py-3 bg-white text-black border border-azure-600 text-black-900 rounded-xl shadow hover:bg-azure-50 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
