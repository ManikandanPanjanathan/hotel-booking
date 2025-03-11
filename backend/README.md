# Hotel Booking Backend

## Description
This is the backend for a hotel booking system built with Node.js, Express, and Prisma ORM in an MVC architecture. It provides APIs for user authentication, hotel management, booking creation, and check-in functionality, using PostgreSQL as the database.

## Technologies Used
- Node.js
- Express.js
- Prisma ORM
- Postgres

## Setup Instructions

### 1. Installation
Install dependencies - `npm install`

### 2. Configure Environment Variables
Create a `.env` file in `backend/`:
- `DATABASE_URL="postgresql://username:password@localhost:5432/hotel_booking?schema=public"`
- `PORT=5000`
- Replace `username` and `password` with your PostgreSQL credentials.
- Create the `hotel_booking` database:
  psql -U postgres
  CREATE DATABASE hotel_booking;
  \q

### 3. Set Up Prisma
- Apply migrations to create tables:
  `npx prisma migrate dev`
- Generate the Prisma Client:
  `npx prisma generate`

### 4. Start the Server
  `npm run server`
- The server runs on `http://localhost:5000`.

### Authentication
- **POST /api/auth/register**
  - Body: `{ "email": "mani@test.com", "password": "987654" }`
  - Response: `{ "success": true, "user": { "id": 1, "email": "mani@test.com" } }`
- **POST /api/auth/login**
  - Body: `{ "email": "mani@test.com", "password": "987654" }`
  - Response: `{ "success": true, "user": { "id": 1, "email": "mani@test.com" } }`

### Hotels
- **POST /api/hotels/registerHotel**
  - Body: `{ "name": "string", "location": "string?", "availableRooms": number?, "pricePerNight": number? }`
  - Example: `{ "name": "Bengaluru Resort", "location": "Bengaluru", "availableRooms": 10, "pricePerNight": 1340.00 }`
  - Response: `{ "success": true, "hotel": { "id": 1, "name": "Bengaluru Resort", ... } }`
- **GET /api/hotels**
  - Response: `{ "success": true, "hotels": [...] }`

### Bookings
- **POST /api/bookings**
  - Body: `{ "userId": 1, "hotelId": 1, "checkInDate": "2025-03-20", "checkOutDate": "2025-03-22" }`
  - Response: `{ "success": true, "booking": {...} }`
- **GET /api/bookings/:userId**
  - Response: `{ "success": true, "bookings": [...] }`
- **POST /api/bookings/checkin/:bookingId**
  - Body: `{ "familyMembers": [{ "name": "manikandan", "aadhaar": "123456789012" }] }`
  - Response: `{ "success": true, "booking": {...} }`
