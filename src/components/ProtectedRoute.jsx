"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [session, isPending, router, pathname]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#264735] border-t-transparent" />
      </div>
    );
  }

  return children;
}