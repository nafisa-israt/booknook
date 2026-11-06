
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { BookOpen, Pencil, Trash2, X } from "lucide-react";

function MyBooksContent() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    let active = true;

    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();

        if (active) {
          setBooks(
            data.filter((book) => book.addedByEmail === user.email)
          );
        }
      } catch (error) {
        if (active) toast.error(error.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchBooks();

    return () => {
      active = false;
    };
  }, [user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;

    const updatedBook = {
      title: form.title.value.trim(),
      author: form.author.value.trim(),
      category: form.category.value,
      image: form.image.value.trim(),
      description: form.description.value.trim(),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      setBooks((previous) =>
        previous.map((book) =>
          book._id === editingBook._id
            ? { ...book, ...updatedBook }
            : book
        )
      );

      setEditingBook(null);
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/books/${deletingBook._id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      setBooks((previous) =>
        previous.filter((book) => book._id !== deletingBook._id)
      );

      setDeletingBook(null);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error(error.message);
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
      {books.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e3d8] bg-white px-6 py-20 text-center">
          <BookOpen size={55} className="mx-auto mb-5 text-[#bd704d]" />

          <h2 className="text-2xl font-bold text-[#264735]">
            No Books Added Yet
          </h2>

          <p className="mt-3 text-[#77776b]">
            Books you add will appear here.
          </p>

          <Link
            href="/add-book"
            className="mt-7 inline-block rounded-xl bg-[#264735] px-7 py-3 font-semibold text-white hover:bg-[#bd704d]"
          >
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-2xl border border-[#e8e3d8] bg-white shadow-sm"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={640}
                height={256}
                unoptimized
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <span className="rounded-full bg-[#eaf0e9] px-3 py-1 text-xs font-semibold text-[#264735]">
                  {book.category}
                </span>

                <h2 className="mt-4 text-xl font-bold text-[#264735]">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-[#bd704d]">
                  By {book.author}
                </p>

                <p className="mt-3 text-sm text-[#77776b]">
                  Available Copies: {book.availableCopies ?? book.totalCopies}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#264735] py-3 text-sm font-semibold text-white hover:bg-[#355c43]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeletingBook(book)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#bd704d] py-3 text-sm font-semibold text-white hover:bg-[#a85d3d]"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6">
          <div className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute right-5 top-5 text-gray-500"
            >
              <X size={22} />
            </button>

            <h2 className="mb-6 text-2xl font-bold text-[#264735]">
              Edit Book
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="title"
                defaultValue={editingBook.title}
                placeholder="Book Title"
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <input
                name="author"
                defaultValue={editingBook.author}
                placeholder="Author"
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <select
                name="category"
                defaultValue={editingBook.category}
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>

              <input
                name="image"
                defaultValue={editingBook.image}
                placeholder="Image URL"
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <textarea
                name="description"
                defaultValue={editingBook.description}
                placeholder="Book Description"
                required
                rows={4}
                className="w-full rounded-lg border px-4 py-3"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#264735] py-3 font-semibold text-white hover:bg-[#bd704d] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center">
            <Trash2 size={40} className="mx-auto mb-4 text-[#bd704d]" />

            <h2 className="text-xl font-bold text-[#264735]">
              Delete This Book?
            </h2>

            <p className="mt-3 text-sm text-[#77776b]">
              Are you sure you want to delete &quot;{deletingBook.title}&quot;?
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeletingBook(null)}
                className="flex-1 rounded-lg border py-3 font-semibold text-[#264735]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-[#bd704d] py-3 font-semibold text-white hover:bg-[#a85d3d]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function MyBooksPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-[#264735]">
            My Books
          </h1>

          <p className="mb-10 mt-3 text-[#77776b]">
            Manage the books you have added.
          </p>

          <MyBooksContent />
        </div>
      </main>
    </ProtectedRoute>
  );
}
