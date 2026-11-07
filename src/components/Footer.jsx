import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#192e23] px-5 py-12 text-[#f8f6f0]">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 lg:px-10">
        <div>
          <h2 className="text-3xl font-bold">BookNook <span className="text-[#d18a63]">(বইঘর)</span></h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
            বইয়ের সঙ্গে বন্ধুত্ব গড়ার ছোট্ট একটি ঠিকানা। পড়ুন, জানুন এবং জ্ঞানের আলো ছড়িয়ে দিন।
          </p>
        </div>
        <div>
          <h3 className="font-bold">Quick Links</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
            <Link href="/">Home</Link>
            <Link href="/books">All Books</Link>
            <Link href="/add-book">Add Book</Link>
            <Link href="/my-books">My Books</Link>
            <Link href="/my-borrows">My Borrows</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Stay Connected</h3>
          <p className="mt-5 text-sm leading-7 text-white/60">A little library, a world of stories.</p>
          <p className="mt-4 text-sm text-[#d18a63]">
            <a href="mailto:hello@boighor.com">hello@boighor.com</a>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/70">
            <a href="https://github.com/nafisa-israt/booknook" target="_blank" rel="noreferrer" className="hover:text-[#d18a63]">GitHub</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-[#d18a63]">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-[#d18a63]">Instagram</a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:text-[#d18a63]">X</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 BookNook (BoiGhor). All rights reserved.
      </div>
    </footer>
  );
}
