"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Eye } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://booknook-server-bzvz.onrender.com/books");

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(Array.isArray(data) ? data : data.books || []);
      } catch (error) {
        console.error("Books fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#bd704d]">
            Explore Our Collection
          </p>

          <h1 className="text-4xl font-bold text-[#264735] md:text-5xl">
            All Books
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[#77776b]">
            Discover your next favorite book from our growing collection.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#264735] border-t-transparent" />
          </div>
        ) : books.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-[#bd704d]" />
            <h2 className="text-2xl font-semibold text-[#264735]">
              No Books Found
            </h2>
            <p className="mt-2 text-[#77776b]">
              There are no books in our collection yet.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#77776b]">
              Showing {books.length} books
            </p>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-2xl border border-[#e8e3d8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-64 overflow-hidden bg-[#eee9de]">
                    <img
                      src={book.image || "https://placehold.co/600x400?text=Book"}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <span className="rounded-full bg-[#eaf0e9] px-3 py-1 text-xs font-semibold text-[#264735]">
                      {book.category}
                    </span>

                    <h2 className="mt-4 text-xl font-bold text-[#264735]">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-sm text-[#77776b]">
                      By {book.author}
                    </p>

                    <Link
                      href={`/books/${book._id}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#264735] py-3 text-sm font-semibold text-white transition hover:bg-[#bd704d]"
                    >
                      <Eye size={17} />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}