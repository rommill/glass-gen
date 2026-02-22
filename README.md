Glassy - Cloud Glassmorphism Studio
Glassy is a high-performance, full-stack design tool built for modern web developers. It allows you to create, orchestrate, and share glassmorphism effects with a focus on fluid UX and secure data management.

Live Demo: https://glass-gen.vercel.app/

Recent Updates (Feb 2026)
Fluid Motion System: Integrated Framer Motion for liquid-smooth layout transitions and micro-interactions.

Relational "Likes" Engine: Migrated to a dedicated PostgreSQL relation to prevent like-padding and ensure unique user engagement.

Enhanced Export: Added one-click CSS file generation in addition to clipboard copying.

Layout Stability: Implemented popLayout strategies to eliminate layout shifts during real-time sorting and filtering.

Features:
Precision Editor: Real-time control over blur, opacity, and hex-color with immediate visual feedback.

Community Gallery: A global feed of community-created presets with Smart Sorting (Popular vs. Recent).

Smart Auth: Secure passwordless authentication via Supabase Magic Links.

Developer Experience: Instant CSS code generation with vendor prefixes for cross-browser support (Webkit/Backdrop-filter).

Security & Architecture
This project goes beyond basic CRUD by implementing a robust PostgreSQL-level security layer:

Row Level Security (RLS): Sophisticated policies ensure that while everyone can browse, only owners have write/delete permissions.

Relational Integrity: Uses ON DELETE CASCADE to maintain database cleanliness when presets are removed.

Performance: Optimized queries using Supabase complex selects to fetch aggregate like counts and user-specific states in a single round-trip.

SQL:
-- Example of the RLS logic used:
create policy "Individual delete" on public.presets
for delete to authenticated
using (auth.uid() = user_id);

Tech Stack:
Frontend: Next.js 15 (App Router, React 19)

Animations: Framer Motion

Backend/DB: Supabase (PostgreSQL)

Styling: Tailwind CSS

Components: Lucide React, React Hot Toast

Getting Started
Clone & Install:

Bash:
git clone https://github.com/rommill/glass-gen.git
npm install
Environment Setup:
Create a .env.local:

Code snippet:
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
Development:

Bash:
npm run dev

License:
Distributed under the MIT License.

Built by Roman
