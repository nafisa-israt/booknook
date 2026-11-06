
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";
import { toast } from "react-hot-toast";
import { ArrowLeft, BookOpen, X } from "lucide-react";

function BookDetailsContent() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [borrowDate, setBorrowDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(() => {
    const returnDay = new Date();
    returnDay.setDate(returnDay.getDate() + 14);
    return returnDay.toISOString().split("T")[0];
  });

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

  const handleBorrow = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    if (returnDate <= borrowDate) {
      toast.error("Return date must be after borrow date");
      return;
    }

    setBorrowing(true);

    try {
      const response = await authFetch("http://localhost:5000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          userEmail: user.email,
          borrowDate,
          returnDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to borrow book");
      }

      setBook((previousBook) => ({
        ...previousBook,
        availableCopies: previousBook.availableCopies - 1,
      }));

      setShowModal(false);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBorrowing(false);
    }
  };

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

  const availableCopies = Number(book.availableCopies ?? book.totalCopies ?? 0);

  return (
    <>
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

          <p className="mt-3 text-lg text-[#bd704c]">
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
                {availableCopies}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={availableCopies <= 0}
            className="mt-8 w-full rounded-xl bg-[#264735] py-4 font-semibold text-white transition hover:bg-[#bd704d] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {availableCopies <= 0 ? "Currently Unavailable" : "Borrow Book"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h2 className="mb-2 text-2xl font-bold text-[#264735]">
              Borrow This Book
            </h2>

            <p className="mb-6 text-sm text-[#77776b]">
              Confirm your information and select your dates.
            </p>

            <form onSubmit={handleBorrow} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#264735]">
                  Book Title
                </label>
                <input
                  value={book.title}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-gray-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#264735]">
                  Your Name
                </label>
                <input
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-gray-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#264735]">
                  Your Email
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-gray-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#264735]">
                  Borrow Date
                </label>
                <input
                  type="date"
                  value={borrowDate}
                  min={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  required
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#264735]">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={borrowDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={borrowing || !user?.email}
                className="w-full rounded-xl bg-[#264735] py-3 font-semibold text-white transition hover:bg-[#bd704d] disabled:bg-gray-400"
              >
                {borrowing ? "Processing..." : "Confirm Borrow"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function BookDetailsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/books"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#264735] hover:text-[#bd704c]"
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