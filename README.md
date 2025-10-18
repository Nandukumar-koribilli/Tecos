# Smart Kisan

Smart Kisan is a modern web platform for connecting farmers and landowners, featuring crop yield prediction, pest store, and user dashboards. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features
- Farmer and Landowner role selection
- Secure signup and login
- Crop Yield Predictor
- Pest Store
- User dashboards
- Responsive design

## Getting Started

1. **Install dependencies**
   ```powershell
   npm install
   ```
2. **Start the development server**
   ```powershell
   npm run dev
   ```
3. Open your browser to `http://localhost:5173` (or the port shown in the terminal).

## Project Structure
- `src/components/` — React components (Navbar, RoleSelection, SignupPage, etc.)
- `src/contexts/` — Context providers (Auth)
- `src/lib/` — Supabase client
- `supabase/migrations/` — Database schema

## Configuration
- Update Supabase credentials in `src/lib/supabase.ts` as needed.

## License
MIT
