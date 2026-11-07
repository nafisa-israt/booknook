# 📚 BookNook – Online Book Management & Borrowing Platform

**BookNook** is a responsive online book management and borrowing platform built with Next.js. It allows users to explore books, manage their personal book collections, and borrow books through a simple and user-friendly interface.

## 🌐 Live Website

[Visit BookNook](https://booknook-nafisa7.vercel.app/)

## ✨ Key Features

- **Browse Books:** Explore a collection of books with a clean and organized layout.
- **Book Details:** View detailed information about individual books.
- **Add Books:** Authenticated users can add new books to the collection.
- **Update Books:** Edit existing book information.
- **Delete Books:** Remove books from the collection.
- **Borrow Books:** Borrow available books with selected borrow and return dates.
- **My Borrows:** View personal borrowing history and return borrowed books.
- **Availability Tracking:** Available copies are automatically updated when books are borrowed or returned.
- **Duplicate Borrow Prevention:** Prevents users from borrowing the same book multiple times while it is already borrowed.
- **Authentication:** Supports email/password, Google, and GitHub sign-in.
- **Protected Routes:** Restricts private pages and actions to authenticated users.
- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Notifications:** Provides feedback for successful actions and errors.

## 🛠️ Technologies Used

**Frontend:**
- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- Better Auth
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- JOSE

## 🔐 Authentication & Security

- Email and password authentication.
- Google and GitHub social authentication.
- JWT-based API authorization.
- Protected backend endpoints.
- User-specific borrowing records.
- Private routes for authenticated users.

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/nafisa-israt/booknook.git
```

### 2. Navigate to the project directory

```bash
cd booknook
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add the required environment variables according to your project configuration.

Keep all credentials and secret keys private.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Related Repository

**Backend Server:**  
[https://github.com/nafisa-israt/booknook-server](https://github.com/nafisa-israt/booknook-server)

**Live Backend:**  
[https://booknook-server-bzvz.onrender.com](https://booknook-server-bzvz.onrender.com)

## 👩‍💻 Developer

**Nafisa Anjum Israt**

GitHub: [nafisa-israt](https://github.com/nafisa-israt)

---

*BookNook – Explore, Manage, and Borrow Books.*
