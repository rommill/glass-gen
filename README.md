# Glassy — Cloud Glassmorphism Generator

Glassy is a professional, full-stack Micro-SaaS tool designed for designers and developers to create, preview, and share beautiful Glassmorphism CSS effects in real-time.

** Live Demo:** [https://glass-gen.vercel.app/](https://glass-gen.vercel.app/)

![Project Preview](https://raw.githubusercontent.com/rommill/glass-gen/main/public/preview-screenshot.png)

---

## Features

- **Real-time Editor:** Adjust blur, opacity, and color with instant preview.
- **Cloud Storage:** Save your favorite presets to a global gallery.
- **Authentication:** Secure sign-in via Magic Links.
- **Advanced Security:** Implemented **Row Level Security (RLS)** in Supabase. Users can only edit or delete their own presets.
- **UX Focused:** - Responsive design (optimized for mobile).
  - Skeleton loaders for smooth data fetching.
  - Interactive "Likes" system.
  - Ownership badges ("You" indicator for personal presets).

## Security Architecture

Unlike simple CRUD apps, this project uses **Supabase RLS policies**:

- `SELECT`: Public access for all community presets.
- `INSERT`: Authenticated users only.
- `DELETE/UPDATE`: Restricted to the creator using `auth.uid() == user_id`.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL + Real-time)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/rommill/glass-gen.git](https://github.com/rommill/glass-gen.git)
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Created by Roman_
