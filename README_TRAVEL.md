# Compass and Co. - Travel Experience Platform

A full-featured travel experience web application built with React and Vite. The platform allows users to explore destinations, plan trips, and interact with an AI-powered travel assistant, with data persistence handled through Firebase and interactive maps powered by Leaflet.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

---

## Overview

Compass and Co. is a modern travel platform that combines interactive mapping, AI-assisted trip planning via Google Gemini, and real-time data storage through Firebase. The application is built as a single-page application (SPA) using React 19 with client-side routing via React Router.

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router DOM v7
- **State Management:** Zustand
- **Backend / Database:** Firebase v12
- **AI Integration:** Google Generative AI (Gemini)
- **Maps:** Leaflet + React Leaflet
- **Icons:** React Icons
- **Styling:** CSS (custom, ~42% of codebase)
- **Linting:** ESLint 9

---

## Features

- Interactive maps using Leaflet for exploring and pinning travel destinations
- AI-powered travel assistant and itinerary suggestions via Google Gemini
- User authentication and data persistence through Firebase
- Client-side routing for a seamless single-page experience
- Global state management with Zustand
- Responsive UI with custom CSS and multiple Google Font families (Playfair Display, Manrope, DM Sans, Cormorant Garamond, Lato, Gilda Display)

---

## Project Structure

```
travel/
├── public/             # Static assets (logo, images)
├── src/                # Application source code
│   └── main.jsx        # Application entry point
├── index.html          # HTML shell with font and Leaflet CDN links
├── package.json        # Project metadata and dependencies
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── .gitignore
```

---

## Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later)
- A Firebase project with Firestore and Authentication enabled
- A Google Generative AI (Gemini) API key

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/annanyaa03/travel.git
cd travel
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_google_generative_ai_key
```

All environment variables must be prefixed with `VITE_` to be accessible in the Vite application.

---

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI library |
| react-dom | ^19.2.4 | DOM rendering |
| react-router-dom | ^7.13.1 | Client-side routing |
| zustand | ^5.0.12 | State management |
| firebase | ^12.10.0 | Backend, auth, and database |
| @google/generative-ai | ^0.24.1 | Gemini AI integration |
| leaflet | ^1.9.4 | Interactive maps |
| react-leaflet | ^5.0.0 | React bindings for Leaflet |
| react-icons | ^5.6.0 | Icon library |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^8.0.0 | Build tool and dev server |
| @vitejs/plugin-react | ^6.0.0 | React plugin for Vite (uses Oxc) |
| eslint | ^9.39.4 | Linting |
| eslint-plugin-react-hooks | ^7.0.1 | React Hooks lint rules |
| eslint-plugin-react-refresh | ^0.5.2 | React Refresh lint rules |

---

## License

This project does not currently specify a license.
