# 📚 BookNook – Online Book Management & Borrowing Platform

**BookNook** is a responsive online book management and borrowing platform built with Next.js. Users can explore books, manage their own collections, and borrow available books.

## 🌐 Live Website
[Visit BookNook](https://booknook-nafisa7.vercel.app/)

## ✨ Features
- Browse all books and view individual book details.
- Add books with an image upload.
- Edit and delete books added by the logged-in user.
- Borrow available books with borrow and return dates.
- View borrowing history and return borrowed books.
- Track total and available copies.
- Prevent duplicate active borrowing of the same book.
- Email/password and Google authentication with Better Auth.
- Protected pages and JWT-protected backend APIs.
- Update profile name and photo.
- Responsive desktop and mobile navigation.
- Loading states, toast notifications, and custom 404 page.

## 🛠️ Technologies
**Frontend:** Next.js, React, JavaScript, Tailwind CSS, Lucide React, Better Auth, React Hot Toast, Swiper.

**Backend:** Node.js, Express.js, MongoDB, JWT, JOSE.

## 🔐 Environment Variables
Configure these in Vercel (and in a local `.env.local` file):

```env
MONGODB_URI=
BETTER_AUTH_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_API_KEY=
```

Use the exact production Better Auth URL for the deployed client. Never commit real credentials.

## 🚀 Local Setup
```bash
git clone https://github.com/nafisa-israt/booknook.git
cd booknook
npm install
npm run dev
``

Open http://localhost:3000.

## 🔗 Backend
Repository: https://github.com/nafisa-israt/booknook-server  
Live API: https://booknook-server-bzvz.onrender.com

## 👩‍💻 Developer
**Nafisa Anjum Israt**  
GitHub: https://github.com/nafisa-israt

---
*BookNook – Explore, Manage, and Borrow Books.*
