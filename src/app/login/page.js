
"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const getCallbackURL = () => {
    if (typeof window === "undefined") return "/";
    const requested = new URLSearchParams(window.location.search).get("callbackUrl");
    return requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  };
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    try {
      const { error } = await authClient.signIn.email({
        email: form.email.value,
        password: form.password.value,
        callbackURL: getCallbackURL(),
      });

      if (error) {
        toast.error(error.message || "Login failed");
      } else {
        toast.success("Login successful!");
        router.push(getCallbackURL());
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed!");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-[#e8e3d8] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#264735]">Welcome Back</h1>
          <p className="mt-2 text-sm text-[#77776b]">
            Login to continue exploring BookNook.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Email</label>
            <input name="email" type="email" required placeholder="Enter your email" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263d32]">Password</label>
            <input name="password" type="password" required placeholder="Enter your password" className="w-full rounded-xl border border-[#ddd8cc] px-4 py-3 outline-none focus:border-[#264735]" />
          </div>

          <button disabled={loading} type="submit" className="w-full rounded-xl bg-[#264735] py-3 font-semibold text-white transition hover:bg-[#c47751] disabled:opacity-60">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e8e3d8]" />
          <span className="text-xs text-[#999]">OR</span>
          <div className="h-px flex-1 bg-[#e8e3d8]" />
        </div>

        <button onClick={handleGoogleLogin} disabled={googleLoading} className="w-full rounded-xl border border-[#ddd8cc] py-3 font-semibold text-[#263d32] hover:bg-[#f8f6f0] disabled:opacity-60">
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-[#77776b]">
          New to BookNook?{" "}
          <Link href="/register" className="font-semibold text-[#bd704d]">Create Account</Link>
        </p>
      </div>
    </main>
  );
}
