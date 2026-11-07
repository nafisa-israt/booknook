
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  BookMarked,
  Library,
  Quote,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "বাংলা সাহিত্যের চিরন্তন ঠিকানা",
    title: "প্রতিটি বই\nএকটি নতুন পৃথিবী",
    description:
      "পাতার পর পাতা, শব্দের পর শব্দ—আবিষ্কার করুন আপনার পরবর্তী প্রিয় গল্পটি।",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200",
  },
  {
    eyebrow: "READ · EXPLORE · DISCOVER",
    title: "হারিয়ে যান\nগল্পের গভীরে",
    description:
      "উপন্যাস, কবিতা কিংবা ইতিহাস—আপনার কল্পনার জগৎ অপেক্ষায় আছে।",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200",
  },
  {
    eyebrow: "আপনার ছোট্ট বইয়ের জগৎ",
    title: "বই হোক\nপ্রতিদিনের সঙ্গী",
    description:
      "পছন্দের বই খুঁজুন, ধার নিন এবং ফিরিয়ে দিন—সবকিছু এক জায়গায়।",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200",
  },
];

const categories = [
  { name: "উপন্যাস", english: "Novels", icon: "📖" },
  { name: "কবিতা", english: "Poetry", icon: "✒️" },
  { name: "ইতিহাস", english: "History", icon: "🏛️" },
  { name: "বিজ্ঞান", english: "Science", icon: "🔭" },
  { name: "শিশুসাহিত্য", english: "Children", icon: "🧸" },
];

const popularBooks = [
  {
    title: "দেবী",
    author: "হুমায়ূন আহমেদ",
    category: "উপন্যাস",
    color: "#d8b7a0",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
  },
  {
    title: "শেষের কবিতা",
    author: "রবীন্দ্রনাথ ঠাকুর",
    category: "উপন্যাস",
    color: "#b7c5ad",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
  },
  {
    title: "সঞ্চিতা",
    author: "কাজী নজরুল ইসলাম",
    category: "কবিতা",
    color: "#c8b8a6",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  },
];

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Swiper will render only after the component mounts in the browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch latest books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://booknook-server-bzvz.onrender.com/books");

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data.slice(0, 6));
      } catch (error) {
        console.error("Books loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const displayedBooks = books.length > 0 ? books : popularBooks;

  return (
    <main className="min-h-screen bg-[#f8f6f0] text-[#263d32]">
      {/* Hero Slider */}
      <section className="mx-auto max-w-7xl px-4 pt-7 lg:px-10">
        {isMounted ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="overflow-hidden rounded-[24px] md:rounded-[32px]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative flex min-h-[440px] items-center overflow-hidden bg-cover bg-center md:min-h-[530px]"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#142b20]/95 via-[#142b20]/75 to-transparent" />

                  <div className="relative z-10 max-w-2xl px-8 py-16 text-white md:px-16">
                    <p className="mb-6 text-xs font-semibold tracking-[4px] text-[#e9b58f] md:text-sm">
                      {slide.eyebrow}
                    </p>

                    <h2 className="whitespace-pre-line text-4xl font-bold leading-[1.3] md:text-6xl">
                      {slide.title}
                    </h2>

                    <p className="mt-6 max-w-md text-sm leading-7 text-white/75 md:text-base">
                      {slide.description}
                    </p>

                    <Link
                      href="/books"
                      className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d18a63] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#264735]"
                    >
                      Browse Books <ArrowRight size={17} />
                    </Link>
                  </div>

                  <div className="absolute bottom-8 right-8 hidden text-right text-white/70 md:block">
                    <p className="text-xs tracking-[3px]">
                      BOIGHOR COLLECTION
                    </p>
                    <p className="mt-2 text-4xl font-light">
                      0{index + 1}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="min-h-[440px] animate-pulse rounded-[24px] bg-[#264735] md:min-h-[530px]" />
        )}
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10">
        <p className="mb-4 text-xs font-bold tracking-[4px] text-[#c47751]">
          WELCOME TO BOIGHOR
        </p>

        <h2 className="text-3xl font-bold leading-snug md:text-5xl">
          বইয়ের পাতায় খুঁজে নিন <br />
          <span className="font-normal italic text-[#b97855]">
            নিজের এক টুকরো পৃথিবী
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#777c70] md:text-base">
          বই শুধু পড়ার বিষয় নয়, বই হলো অনুভূতি, অভিজ্ঞতা আর নতুন
          কিছু জানার এক অনন্য মাধ্যম। আপনার প্রিয় বইটি খুঁজে নিন বইঘরে।
        </p>
      </section>

      {/* Categories */}
      <section className="bg-[#eeeae0] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[3px] text-[#bd704d]">
                EXPLORE BY GENRE
              </p>
              <h2 className="text-3xl font-bold">বইয়ের বিভাগ</h2>
            </div>

            <Link
              href="/books"
              className="hidden items-center gap-2 text-sm font-semibold text-[#bd704d] sm:flex"
            >
              All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                href="/books"
                key={category.name}
                className="group rounded-2xl border border-[#e3ded2] bg-[#f8f6f0] p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#bd704d] hover:shadow-lg"
              >
                <span className="text-4xl">{category.icon}</span>
                <h3 className="mt-4 font-bold">{category.name}</h3>
                <p className="mt-1 text-xs tracking-wider text-[#999487]">
                  {category.english}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Books */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[3px] text-[#bd704d]">
              FRESH FROM THE SHELF
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              নতুন সংযোজন
            </h2>
            <p className="mt-3 text-sm text-[#85877b]">
              আমাদের সংগ্রহে যুক্ত হওয়া সর্বশেষ বইগুলো
            </p>
          </div>

          <Link
            href="/books"
            className="hidden items-center gap-2 text-sm font-semibold text-[#bd704d] sm:flex"
          >
            See All Books <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-[#85877b]">
            বইগুলো লোড হচ্ছে...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedBooks.map((book, index) => (
              <Link
                href={book._id ? `/books/${book._id}` : "/books"}
                key={book._id || index}
                className="group overflow-hidden rounded-2xl border border-[#e9e4d9] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className="relative h-64 overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundColor: popularBooks[index % 3].color,
                    backgroundImage: `url(${
                      book.image || popularBooks[index % 3].image
                    })`,
                  }}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-[#f8f6f0] px-4 py-1.5 text-xs font-semibold text-[#45604d]">
                    {book.category || "নতুন বই"}
                  </span>

                  <div className="absolute inset-0 bg-[#183a29]/0 transition group-hover:bg-[#183a29]/10" />
                </div>

                <div className="p-6">
                  <p className="text-xs text-[#bd704d]">
                    BOIGHOR COLLECTION
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#85877b]">
                    লেখক: {book.author}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#eeeae0] pt-4">
                    <span className="text-xs font-medium text-[#777c70]">
                      View Details
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-[#bd704d] transition group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#264735] px-7 py-3 text-sm font-semibold text-white"
          >
            See All Books <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#264735] px-5 py-20 text-center text-[#f8f6f0]">
        <Quote className="mx-auto mb-6 text-[#d18a63]" size={35} />

        <p className="mx-auto max-w-3xl text-2xl font-medium leading-relaxed md:text-4xl">
          "বই মানুষের মনের জানালা খুলে দেয়,
          <br className="hidden md:block" />
          দেখায় অচেনা পৃথিবীর পথ।"
        </p>

        <p className="mt-7 text-xs tracking-[4px] text-[#d18a63]">
          THE MAGIC OF READING
        </p>
      </section>

      {/* Why Boighor */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold tracking-[3px] text-[#bd704d]">
            MORE THAN A LIBRARY
          </p>
          <h2 className="text-3xl font-bold">কেন বইঘর?</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 text-center">
            <Library className="mx-auto text-[#bd704d]" size={35} />
            <h3 className="mt-5 text-lg font-bold">
              বইয়ের বিশাল সংগ্রহ
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#85877b]">
              বিভিন্ন বিষয়ের বই এক জায়গায় খুঁজে পাওয়ার সহজ ব্যবস্থা।
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-center">
            <BookMarked className="mx-auto text-[#bd704d]" size={35} />
            <h3 className="mt-5 text-lg font-bold">
              সহজে বই ধার নিন
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#85877b]">
              পছন্দের বই ধার নিন এবং নিজের সুবিধামতো ফেরত দিন।
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-center">
            <Sparkles className="mx-auto text-[#bd704d]" size={35} />
            <h3 className="mt-5 text-lg font-bold">
              নতুন কিছু আবিষ্কার
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#85877b]">
              প্রতিটি বইয়ের সঙ্গে পরিচিত হোন নতুন চিন্তা ও অভিজ্ঞতার।
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}