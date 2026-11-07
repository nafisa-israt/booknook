


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";
import { toast } from "react-hot-toast";
import { BookOpen, RotateCcw } from "lucide-react";

function MyBorrowsContent() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    let active = true;

    const loadBorrows = async () => {
      try {
        const response = await authFetch(
          "https://booknook-server-bzvz.onrender.com/borrows"
        );

        if (!response.ok) {
          throw new Error("Failed to load borrowed books");
        }

        const data = await response.json();

        if (active) {
          setBorrows(data);
        }
      } catch (error) {
        if (active) toast.error(error.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBorrows();

    return () => {
      active = false;
    };
  }, [user?.email]);

  const handleReturn = async (borrowId) => {
    if (!window.confirm("Are you sure you want to return this book?")) {
      return;
    }

    setReturningId(borrowId);

    try {
      const response = await authFetch(
        `https://booknook-server-bzvz.onrender.com/borrows/${borrowId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to return book");
      }

      setBorrows((previous) =>
        previous.map((borrow) =>
          borrow._id === borrowId
            ? { ...borrow, status: "returned" }
            : borrow
        )
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#264735] border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {borrows.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e3d8] bg-white px-6 py-20 text-center">
          <BookOpen size={55} className="mx-auto mb-5 text-[#bd704d]" />

          <h2 className="text-2xl font-bold text-[#264735]">
            No Borrowed Books Yet
          </h2>

          <p className="mt-3 text-[#77776b]">
            Books you borrow will appear here.
          </p>

          <a
            href="/books"
            className="mt-7 inline-block rounded-xl bg-[#264735] px-7 py-3 font-semibold text-white hover:bg-[#bd704d]"
          >
            Explore Books
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e8e3d8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-[#264735] text-white">
                <tr>
                  <th className="px-6 py-5">Book</th>
                  <th className="px-6 py-5">Borrow Date</th>
                  <th className="px-6 py-5">Return Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow._id} className="border-b border-[#e8e3d8]">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={borrow.bookImage || "/placeholder.png"}
                          alt={borrow.bookTitle || "Book"}
                          width={48}
                          height={64}
                          unoptimized
                          className="h-16 w-12 rounded-lg object-cover"
                        />

                        <span className="font-semibold text-[#264735]">
                          {borrow.bookTitle}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#77776b]">
                      {borrow.borrowDate}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#77776b]">
                      {borrow.returnDate}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          borrow.status === "returned"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-[#eaf0e9] text-[#264735]"
                        }`}
                      >
                        {borrow.status === "returned"
                          ? "Returned"
                          : "Borrowed"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {borrow.status === "borrowed" ? (
                        <button
                          onClick={() => handleReturn(borrow._id)}
                          disabled={returningId === borrow._id}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#bd704d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a85d3d] disabled:opacity-50"
                        >
                          <RotateCcw size={15} />
                          {returningId === borrow._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default function MyBorrowsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-[#264735]">
            My Borrows
          </h1>

          <p className="mb-10 mt-3 text-[#77776b]">
            Keep track of the books you have borrowed.
          </p>

          <MyBorrowsContent />
        </div>
      </main>
    </ProtectedRoute>
  );
}
