

"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (error) {
      toast.error("Google sign-up failed!");
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password)) {
      toast.error("Password needs uppercase, lowercase and 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/login",
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-[#e8e3d8] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#264735]">Join BookNook</h1>
          <p className="mt-2 text-sm text-[#77776b]">
            Create your account and start exploring books.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Full Name</label>
            <input name="name" type="text" required placeholder="Enter your name" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Email</label>
            <input name="email" type="email" required placeholder="Enter your email" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Photo URL</label>
            <input name="image" type="url" required placeholder="Enter your photo URL" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Password</label>
            <input name="password" type="password" required placeholder="At least 6 characters" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <button disabled={loading} type="submit" className="w-full rounded-xl bg-[#264735] py-3 font-semibold text-white transition hover:bg-[#c47751] disabled:opacity-60">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e8e3d8]" />
          <span className="text-xs text-[#999]">OR</span>
          <div className="h-px flex-1 bg-[#e8e3d8]" />
        </div>

        <button type="button" onClick={handleGoogleRegister} disabled={googleLoading} className="w-full rounded-xl border border-[#ddd8cc] py-3 font-semibold text-[#263d32] hover:bg-[#f8f6f0] disabled:opacity-60">
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-[#77776b]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#bd704d]">Login</Link>
        </p>
      </div>
    </main>
  );
}
