# Lumina Vitray

A modern Persian e-commerce application for handmade stained glass artwork, built with Next.js and TypeScript.

## ✨ Features

* User authentication and registration
* Protected checkout and profile pages
* Product browsing and product detail pages
* Responsive shopping cart with Zustand
* Cart drawer for quick cart access
* Checkout flow with shipping information
* Server-side price and stock validation
* Order creation and order management
* Fake payment flow for demonstration purposes
* Admin dashboard for product and order management
* Product image upload and management
* Search functionality
* Responsive design for desktop, tablet, and mobile
* Persian RTL interface

## 🛠 Tech Stack

* **Next.js** — App Router
* **TypeScript**
* **React**
* **Tailwind CSS**
* **Prisma ORM**
* **SQLite** — development database
* **NextAuth** — authentication
* **Zustand** — client-side cart state
* **bcryptjs** — password hashing

## 🏗 Architecture

The project uses the Next.js App Router and separates server-side database operations from client-side interactive components.

### Main areas

* `app/` — routes, pages, server actions and API routes
* `components/` — reusable UI components
* `lib/` — shared utilities, stores and payment logic
* `prisma/` — Prisma schema and database migrations
* `public/` — static assets
* `types/` — TypeScript type extensions

## 🔐 Authentication & Authorization

The application includes:

* User registration
* Credential-based login
* Password hashing with bcryptjs
* Session-based authentication with NextAuth
* Role-based access for the admin dashboard
* Protected checkout functionality

## 🛒 E-commerce Flow

The main shopping flow is:

**Products → Cart → Checkout → Order → Payment → Success**

Product prices and stock are validated on the server instead of trusting values stored in the client-side cart.

## 💳 Payment Flow

The project currently uses a **fake payment flow** for demonstration and learning purposes.

The flow is:

**Create Order → Start Payment → Payment Authority → Verify Payment → Mark Order as Paid**

No real payment gateway is connected.

## 👨‍💼 Admin Panel

The admin dashboard provides functionality for:

* Creating products
* Updating products
* Deleting products
* Uploading product images
* Viewing orders
* Viewing users and order information

## 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Notebook42number/lumina-vitray.git
```

Move into the project:

```bash
cd lumina-vitray
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔑 Environment Variables

The project uses environment variables for configuration and authentication secrets.

Create a `.env` file locally and add the required values.

> Never commit your `.env` file or secret credentials to GitHub.

## 📸 Screenshots

Screenshots and a live demo will be added after the production deployment.

## 🔮 Future Improvements

* Real payment gateway integration
* PostgreSQL production database
* Cloud-based image storage
* Persian / English localization
* SEO improvements
* Product filtering and sorting
* Advanced order management
* Multi-tenant SaaS architecture

## 👩‍💻 Author

**Pari**

Frontend Developer focused on React, Next.js and TypeScript.
