import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyBooksPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-[#264735]">
            My Books
          </h1>
          <p className="mt-3 text-[#77776b]">
            Manage the books you have added.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}