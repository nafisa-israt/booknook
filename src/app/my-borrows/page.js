import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyBorrowsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-[#264735]">
            My Borrows
          </h1>

          <p className="mt-3 text-[#77776b]">
            Keep track of the books you have borrowed.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}