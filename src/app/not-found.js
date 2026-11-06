
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#faf9f6] px-6 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#9b8058]">
        BoiGhor Library
      </p>

      <h1 className="text-8xl font-bold text-[#354b3e] md:text-9xl">
        404
      </h1>

      <h2 className="mt-6 text-2xl font-semibold text-[#26382d] md:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-[#77776b]">
        Sorry, the page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-[#354b3e] px-8 py-3 font-medium text-white transition hover:bg-[#26382d]"
      >
        Back to Home
      </Link>
    </main>
  );
}
