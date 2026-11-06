"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, BookOpen } from "lucide-react";

function BookDetailsContent() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/books/${id}`
        );

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#264735] border-t-transparent" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="py-20 text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-[#bd704d]" />
        <h2 className="text-2xl font-bold text-[#264735]">
          Book Not Found
        </h2>
        <p className="mt-2 text-[#77776b]">
          Sorry, this book could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 rounded-3xl border border-[#e8e3d8] bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div className="overflow-hidden rounded-2xl bg-[#eee9de]">
        <img
          src={book.image}
          alt={book.title}
          className="h-full max-h-[550px] min-h-[350px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="w-fit rounded-full bg-[#eaf0e9] px-4 py-2 text-xs font-semibold text-[#264735]">
          {book.category}
        </span>

        <h1 className="mt-5 text-3xl font-bold text-[#264735] md:text-4xl">
          {book.title}
        </h1>

        <p className="mt-3 text-lg text-[#bd704d]">
          By {book.author}
        </p>

        <div className="my-7 h-px bg-[#e8e3d8]" />

        <h2 className="mb-3 font-bold text-[#264735]">
          About This Book
        </h2>

        <p className="leading-7 text-[#77776b]">
          {book.description}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#f8f6f0] p-4">
            <p className="text-xs text-[#8b8b78]">Total Copies</p>
            <p className="mt-1 text-xl font-bold text-[#264735]">
              {book.totalCopies ?? "N/A"}
            </p>
          </div>

          <div className="rounded-xl bg-[#f8f6f0] p-4">
            <p className="text-xs text-[#8b8b78]">Available Copies</p>
            <p className="mt-1 text-xl font-bold text-[#264735]">
              {book.availableCopies ?? book.totalCopies ?? "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/my-borrows")}
          className="mt-8 w-full rounded-xl bg-[#264735] py-4 font-semibold text-white transition hover:bg-[#bd704d]"
        >
          Borrow Book
        </button>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/books"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#264735] hover:text-[#bd704d]"
          >
            <ArrowLeft size={18} />
            Back to All Books
          </Link>

          <Suspense
            fallback={
              <div className="flex min-h-80 items-center justify-center">
                Loading book details...
              </div>
            }
          >
            <BookDetailsContent />
          </Suspense>
        </div>
      </main>
    </ProtectedRoute>
  );
}