
# 🛒 Dorbazar Frontend (Assignment-12)

Welcome to the **Dorbazar** Frontend — a full-featured e-commerce-like React application for product listing, real-time reviews, secure Stripe payments, user authentication, admin/vendor dashboards, and more.

This is the frontend of the Dorbazar system, built with **React**, **Vite**, **Tailwind CSS**, and several modern libraries to deliver a seamless experience.

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password + Google)
- 🧑‍💼 Role-based Access (Admin / Vendor / Buyer)
- 📦 Product Listing & Details with Dynamic Pricing
- 💳 Stripe Payment Integration
- ❤️ Wishlist, Cart, and Quantity Selection
- 🗣 Review System (One-per-user with Edit/Delete)
- 📊 Dashboard with Recharts Pie Chart
- 🎨 Responsive UI with Tailwind, DaisyUI, and Animations
- 🧭 Protected Routes with React Router
- ⚙️ Admin Tools: Manage Users, Reject Products, Advertise Requests

---

## 🧰 Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS 4** + **DaisyUI**
- **React Hook Form** for form handling
- **React Router v7**
- **Framer Motion** + **Lottie** for animations
- **Stripe.js** for secure payments
- **Firebase v11** for auth and user management
- **SweetAlert2**, **Toastify**, **Swiper**, **Recharts**, and more!

---

## 📦 Project Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/dorbazar-frontend.git
cd dorbazar-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

In the root of the project, create a `.env` file with the following content:

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> 🔐 Keep this file secret! Do not share or commit it to version control.

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Scripts

| Command        | Description                     |
|----------------|---------------------------------|
| `npm run dev`  | Start development server        |
| `npm run build`| Build for production            |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks               |

---

## 📁 Folder Structure (Key Parts)

```
src/
├── components/        # Reusable UI components
├── pages/             # All page routes (Home, Products, Dashboard etc.)
├── provider/          # AuthProvider for context
├── hooks/             # Custom hooks like useAxiosSecure
├── forms/             # Forms like Checkout, Product Add/Edit
├── routes/            # PrivateRoute and Router logic
```

---

## 🧪 Dependencies Highlight

- **React Query**: Data fetching and caching
- **Stripe**: Secure card payments
- **Framer Motion**: UI animation
- **React Toastify**: User notifications
- **SweetAlert2**: Confirmations & alerts
- **Swiper.js**: Testimonial & carousel sliders
- **Recharts**: Dashboard analytics

---

## ✨ Contributing

PRs are welcome! If you'd like to improve the UI, fix bugs, or add features, feel free to fork and submit a pull request.

---

## 📄 License

This project is part of **Assignment-12** for learning and demonstration purposes. © Hasibul Islam, 2025

---

### 🔗 Backend Repo

> 👉 Don't forget to clone and run the backend server:  
> [https://github.com/your-username/dorbazar-backend](https://github.com/your-username/dorbazar-backend)

---

### 💬 Need Help?

Message me on [LinkedIn](https://www.linkedin.com/in/-hasibul-islam-/)  
Or email: `jrweb.hasib@gmail.com`

---
