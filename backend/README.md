# BlockHost Authentication Backend

Secure authentication backend for the BlockHost Minecraft hosting platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt (12 salt rounds)
- **Notifications**: Telegram Bot API

## Features

- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Rate limiting on authentication endpoints
- Telegram notifications for new registrations
- Protected routes with JWT middleware
- Generic error messages for security
- CORS and security headers with Helmet

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
   - Set your MongoDB connection string
   - Generate a strong JWT secret
   - Add your Telegram bot token (optional)

4. Start the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Endpoints

### Public Routes

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "player123",
  "email": "player@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "player123",
    "email": "player@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "player@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "player123",
    "email": "player@example.com",
    "role": "user",
    "lastLogin": "2024-01-15T10:35:00.000Z"
  }
}
```

### Protected Routes

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "player123",
    "email": "player@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastLogin": "2024-01-15T10:35:00.000Z"
  }
}
```

## Security Features

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens expire after 7 days
- Rate limiting: 5 attempts per 15 minutes on auth routes
- Generic error messages to prevent information leakage
- CORS configured for frontend domain only
- Security headers with Helmet middleware
- Password never returned in API responses

## Telegram Notifications

When a new user registers, a notification is sent to the configured Telegram chat:

```
🆕 New BlockHost Registration

👤 Username: player123
📧 Email: player@example.com
🕒 Time: Jan 15, 2024, 10:30 AM
```

To set up Telegram notifications:
1. Create a bot with [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Add the token to `.env` as `TELEGRAM_BOT_TOKEN`
4. The chat ID is already set to: 7339063037

## Database Schema

```javascript
{
  username: String (unique, 3-20 chars),
  email: String (unique, valid email),
  password: String (hashed, min 6 chars),
  role: String (default: "user"),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 5000) |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT signing | Yes |
| TELEGRAM_BOT_TOKEN | Telegram bot token | No |
| TELEGRAM_CHAT_ID | Owner chat ID | No (default: 7339063037) |
| FRONTEND_URL | Frontend URL for CORS | No (default: localhost:3000) |

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## License

MIT
