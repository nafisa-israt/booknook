"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Save } from "lucide-react";
import toast from "react-hot-toast";

function ProfileContent() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user?.id, user?.name, user?.image]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        ...(image.trim() ? { image: image.trim() } : {}),
      });
      if (error) throw new Error(error.message || "Profile update failed");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-[#e8e3d8] bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#264735]">My Profile</h1>
            <p className="mt-2 text-sm text-[#8b8b78]">View and update your BookNook profile.</p>
          </div>
          {isPending ? (
            <div className="py-10 text-center text-[#77776b]">Loading profile...</div>
          ) : (
            <>
              <div className="mb-8 flex justify-center">
                <img src={image || user?.image || "https://i.pravatar.cc/150"} alt="Profile" className="h-28 w-28 rounded-full border-4 border-[#e8e3d8] object-cover" />
              </div>
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-[#8b8b78]"><User size={17}/> Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]" />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-[#8b8b78]"><Mail size={17}/> Email Address</label>
                  <input value={user?.email || ""} readOnly className="w-full rounded-xl border border-[#e8e3d8] bg-[#f8f6f0] px-4 py-3 text-[#77776b]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#8b8b78]">Profile Photo URL</label>
                  <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" className="w-full rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]" />
                </div>
                <button type="submit" disabled={saving || !user} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#264735] py-3 font-semibold text-white hover:bg-[#bd704d] disabled:opacity-60">
                  <Save size={18}/>{saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return <ProtectedRoute><ProfileContent /></ProtectedRoute>;
}