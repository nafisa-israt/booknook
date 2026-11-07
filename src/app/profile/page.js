"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-[#e8e3d8] bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#264735]">
                My Profile
              </h1>
              <p className="mt-2 text-sm text-[#8b8b78]">
                Your personal information at BookNook
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <img
                src={user?.image || "https://i.pravatar.cc/150"}
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-[#e8e3d8] object-cover"
              />
            </div>

            <div className="space-y-5">
              <div className="rounded-xl bg-[#f8f6f0] p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-[#8b8b78]">
                  <User size={17} />
                  Full Name
                </div>
                <p className="font-semibold text-[#264735]">
                  {user?.name || "Loading..."}
                </p>
              </div>

              <div className="rounded-xl bg-[#f8f6f0] p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-[#8b8b78]">
                  <Mail size={17} />
                  Email Address
                </div>
                <p className="font-semibold text-[#264735]">
                  {user?.email || "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}