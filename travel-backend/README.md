# Travel Backend - Enterprise Edition 🌍

A production-ready, feature-rich backend for a modern travel website. Built with Node.js, Express, Supabase, Stripe, and Socket.io.

## 🚀 Features

- **Authentication**: JWT-based auth via Supabase with Google OAuth support.
- **Destinations**: Advanced filtering, search, and featured listings.
- **Bookings**: Automated slot management and confirmation emails.
- **Payments**: Full Stripe integration with webhooks and refund support.
- **Reviews**: Verified purchase review system with rating aggregation.
- **Search**: Fuzzy matching and trending search analytics.
- **Real-time**: Live notifications and slot updates via Socket.io.
- **Background Jobs**: Automated booking reminders and cleanup tasks.
- **Security**: Helmet, Rate Limiting, Sanitization, and XSS protection.
- **Caching**: Multi-layer Redis caching with in-memory fallback.
- **Analytics**: Comprehensive dashboard stats and event tracking.

## 🛠️ Tech Stack

- **Core**: Node.js (v18+), Express 5.0
- **Database**: Supabase (PostgreSQL)
- **Caching**: Redis (ioredis) + node-cache
- **Payments**: Stripe API
- **Real-time**: Socket.io 4.8
- **Validation**: Zod 3.23
- **Email**: Nodemailer + Handlebars
- **Logging**: Pino + Winston
- **Task Scheduling**: Node-cron

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **Redis**: Local or cloud instance
- **Supabase**: Account and project setup
- **Stripe**: Developer account for API keys

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd travel-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`
   - Fill in your API keys for Supabase, Stripe, SMTP, and Redis.

4. **Database Setup**:
   - Run the SQL queries in `database.sql` within your Supabase SQL Editor.
   - Set up a storage bucket named `travel-images` in Supabase.

5. **Start the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Destinations
- `GET /api/destinations` - Paginated list with filters
- `GET /api/destinations/:id` - Get details by ID
- `GET /api/destinations/slug/:slug` - Get details by slug

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - My bookings history
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/create-checkout` - Initiate Stripe session
- `POST /api/payments/webhook` - Stripe webhook handler

### Health
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Full system status

## 🧪 Testing

Run all unit and integration tests:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License.
