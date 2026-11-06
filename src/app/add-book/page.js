
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import { BookPlus, Upload, ImagePlus } from "lucide-react";

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const user = session?.user;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB!");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.error("Please upload a book image!");
      return;
    }

    setLoading(true);

    const form = e.target;

    try {
      // Upload image to ImgBB
      const imageData = new FormData();
      imageData.append("image", selectedImage);

      const imageResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const uploadedImage = await imageResponse.json();

      if (!imageResponse.ok || !uploadedImage.success) {
        throw new Error("Image upload failed!");
      }

      const bookData = {
        title: form.title.value.trim(),
        author: form.author.value.trim(),
        category: form.category.value,
        image: uploadedImage.data.display_url,
        description: form.description.value.trim(),
        totalCopies: Number(form.totalCopies.value),
        addedBy: user?.name,
        addedByEmail: user?.email,
      };

      // Save book to MongoDB
       const response = await authFetch("https://booknook-server-bzvz.onrender.com/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      form.reset();
      setSelectedImage(null);
      setPreview("");

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f8f6f0] px-5 py-16">
        <div className="mx-auto max-w-3xl">

          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-[#264735] p-4 text-white">
                <BookPlus size={30} />
              </div>
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#bd704d]">
              Grow Our Collection
            </p>

            <h1 className="text-4xl font-bold text-[#264735]">
              Add a New Book
            </h1>

            <p className="mt-3 text-[#77776b]">
              Share your favorite books with the BoiGhor community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-[#e8e3d8] bg-white p-7 shadow-sm md:p-10"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                required
                className="w-full rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                required
                className="w-full rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Category *
              </label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full rounded-xl border border-[#e8e3d8] bg-white px-4 py-3 outline-none focus:border-[#264735]"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Book Image *
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c9d5ca] bg-[#f8f6f0] px-5 py-8 text-center transition hover:border-[#264735]">
                <Upload size={30} className="mb-3 text-[#264735]" />

                <span className="font-semibold text-[#264735]">
                  Choose Book Image
                </span>

                <span className="mt-1 text-sm text-[#77776b]">
                  JPG, PNG or other image formats (Max 5MB)
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-[#264735]">
                    Image Preview
                  </p>
                  <img
                    src={preview}
                    alt="Book preview"
                    className="h-48 w-full rounded-xl object-contain bg-[#f8f6f0]"
                  />
                  <p className="mt-2 text-sm text-green-700">
                    {selectedImage?.name}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Short Description *
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write a short description about the book..."
                required
                className="w-full resize-none rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#264735]">
                Total Copies *
              </label>
              <input
                type="number"
                name="totalCopies"
                min="1"
                defaultValue="1"
                required
                className="w-full rounded-xl border border-[#e8e3d8] px-4 py-3 outline-none focus:border-[#264735]"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#264735]">
                  Added By
                </label>
                <input
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-xl border border-[#e8e3d8] bg-[#f8f6f0] px-4 py-3 text-[#77776b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#264735]">
                  Email Address
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-[#e8e3d8] bg-[#f8f6f0] px-4 py-3 text-[#77776b]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#264735] py-4 font-semibold text-white transition hover:bg-[#bd704d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ImagePlus size={20} />
              {loading ? "Uploading & Adding Book..." : "Add Book to BoiGhor"}
            </button>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
