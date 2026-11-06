import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddBookPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-3 text-4xl font-bold text-[#264735]">
            Add a New Book
          </h1>

          <p className="text-[#77776b]">
            Share a book with the BoiGhor community.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}