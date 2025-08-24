# Ecom Starter

Full-stack e-commerce starter:
- Frontend: React + Vite + Tailwind + Framer Motion + Zustand
- Backend: Express + SQLite + JWT

## Quick start

1. Backend:
   ```
   cd backend
   npm install
   cp .env.example .env
   # edit .env with a secure JWT_SECRET
   npm run seed
   npm run dev
   ```

2. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

Frontend runs at http://localhost:5173 and backend at http://localhost:4000
