# G-Drive Frontend

Modern frontend for G-Drive built with Next.js, TypeScript, and shadcn/ui.

## Features

- 🎨 Modern dark mode UI with shadcn/ui (Lyra style)
- 🔐 Authentication (Login & Register)
- 📱 Responsive design
- ⚡ Fast and optimized with Next.js 14

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/              # Next.js app directory
│   ├── login/       # Login page
│   ├── register/    # Register page
│   ├── dashboard/   # Dashboard page
│   └── layout.tsx   # Root layout
├── components/      # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utilities and API client
└── public/          # Static assets
```

## Design System

- **Style**: Lyra
- **Theme**: Neutral (Dark mode)
- **Icon Library**: Hugeicons
- **Font**: JetBrains Mono
- **Radius**: None

## API Integration

The frontend connects to the FastAPI backend. Make sure the backend is running on the port specified in `NEXT_PUBLIC_API_URL`.

## Build for Production

```bash
npm run build
npm start
```

