"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BookOpen, ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Logout failed!");
      return;
    }
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/login");
    router.refresh();
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8e3d8] bg-[#f8f6f0]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link href="/" onClick={closeMobile} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#264735] text-[#f5e9d3]"><BookOpen size={23} /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#263d32]">BookNook<span className="text-[#c47751]">.</span></h1>
            <p className="text-[9px] tracking-[3px] text-[#8b8b78]">YOUR LITTLE LIBRARY</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#263d32] md:flex">
          <Link href="/" className="hover:text-[#bd704d]">Home</Link>
          <Link href="/books" className="hover:text-[#bd704d]">All Books</Link>
          {user && <>
            <Link href="/add-book" className="hover:text-[#bd704d]">Add Book</Link>
            <Link href="/my-books" className="hover:text-[#bd704d]">My Books</Link>
            <Link href="/my-borrows" className="hover:text-[#bd704d]">My Borrows</Link>
          </>}
        </div>

        <div className="flex items-center gap-2">
          {isPending ? <div className="h-10 w-20 animate-pulse rounded-full bg-[#e8e3d8]" /> : user ? (
            <div className="relative hidden md:block">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 rounded-full border border-[#e8e3d8] bg-white px-3 py-2">
                {user.image ? <Image src={user.image} alt={user.name || "User profile"} width={32} height={32} unoptimized className="h-8 w-8 rounded-full object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#264735] text-sm font-bold text-white">{user.name?.charAt(0).toUpperCase() || "U"}</div>}
                <span className="max-w-24 truncate text-sm font-semibold text-[#263d32]">{user.name}</span>
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && <div className="absolute right-0 mt-3 w-52 rounded-xl border border-[#e8e3d8] bg-white p-2 shadow-lg">
                <div className="border-b border-[#eeeae0] px-3 py-2">
                  <p className="truncate text-sm font-semibold text-[#263d32]">{user.name || "Reader"}</p>
                  <p className="truncate text-xs text-[#85877b]">{user.email}</p>
                </div>
                <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#263d32] hover:bg-[#f8f6f0]"><User size={16}/> My Profile</Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={16}/> Logout</button>
              </div>}
            </div>
          ) : <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-full bg-[#264735] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c47751]">Login</Link>
            <Link href="/register" className="rounded-full border border-[#264735] px-5 py-2.5 text-sm font-semibold text-[#264735]">Register</Link>
          </div>}
          <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg border border-[#e8e3d8] p-2 text-[#264735] md:hidden">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {mobileOpen && <div className="border-t border-[#e8e3d8] bg-[#f8f6f0] px-5 py-4 md:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-medium text-[#263d32]">
          <Link href="/" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">Home</Link>
          <Link href="/books" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">All Books</Link>
          {user ? <>
            <Link href="/add-book" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">Add Book</Link>
            <Link href="/my-books" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">My Books</Link>
            <Link href="/my-borrows" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">My Borrows</Link>
            <Link href="/profile" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">My Profile · {user.name}</Link>
            <button onClick={handleLogout} className="rounded-lg px-3 py-3 text-left text-red-600 hover:bg-red-50">Logout</button>
          </> : <>
            <Link href="/login" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">Login</Link>
            <Link href="/register" onClick={closeMobile} className="rounded-lg px-3 py-3 hover:bg-[#eeeae0]">Register</Link>
          </>}
        </div>
      </div>}
    </nav>
  );
}