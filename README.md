# 📊 Multi-Tenant CMS Analytics Dashboard

A full-stack, production-ready Content Management System (CMS) with real-time analytics, multi-tenant architecture, and role-based access control. Built with modern web technologies and best practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)](https://www.postgresql.org/)

## ✅ Current Status

**Phase 1: COMPLETE** ✅
- ✅ Full PostgreSQL database integration
- ✅ Complete authentication system (login/register)
- ✅ Protected routes with JWT tokens
- ✅ User session management
- ✅ All services migrated to database
- ✅ Frontend form validation
- ✅ User menu with logout functionality

**Application Status:** 🟢 Running  
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- WebSocket: Connected

> 📚 See [QUICK_START.md](QUICK_START.md) for immediate usage  
> 📖 See [PHASE1_COMPLETED.md](PHASE1_COMPLETED.md) for Phase 1 details

## 🚀 Features

### 🎯 Core Functionality
- **Multi-Tenant Architecture** - Complete tenant isolation with per-tenant data management
- **Real-Time Analytics** - Live metrics and updates using WebSocket (Socket.IO)
- **Role-Based Access Control (RBAC)** - Admin, Editor, and Viewer roles with granular permissions
- **JWT Authentication** - Secure token-based authentication system
- **Content Management** - Full CRUD operations for content with versioning
- **Responsive UI** - Mobile-first design with Tailwind CSS

### 📈 Analytics Features
- Real-time page views and active user tracking
- Interactive charts and data visualizations (Recharts)
- Metric cards with trend indicators
- Content performance analytics
- Bounce rate and average time tracking

### 🛠️ Technical Features
- **TypeScript** throughout the entire stack
- **Production builds** for both frontend and backend
- **WebSocket support** for real-time updates
- **State management** with Redux Toolkit
- **Data fetching** with React Query (TanStack Query)
- **Hot Module Replacement (HMR)** for development
- **Docker support** with docker-compose configuration

## 🏗️ Project Structure

```
cms-analytics-dashboard/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── analytics/   # Analytics-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── layout/      # Layout components (Header, Sidebar)
│   │   │   └── tenant/      # Tenant management components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── store/           # Redux store and slices
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── server/                   # Node.js/Express backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   └── dist/                # Compiled JavaScript (production)
├── shared/                   # Shared types and constants
└── docker-compose.yml       # Docker configuration
```

## 🛠️ Technologies

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript 4.x** - Type-safe JavaScript
- **Vite 4.5** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Redux Toolkit 2.9** - State management
- **React Query (TanStack)** - Server state management
- **Socket.IO Client** - Real-time WebSocket communication
- **Recharts 2.0** - Composable charting library
- **React Router 6** - Client-side routing
- **React Hot Toast** - Beautiful toast notifications

### Backend
- **Node.js 22.x** - JavaScript runtime
- **Express 4.x** - Web application framework
- **TypeScript 4.9** - Type-safe development
- **Socket.IO 3.x** - Real-time bidirectional communication
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing
- **PostgreSQL** - Relational database (configured)
- **Redis** - In-memory data store (optional)
- **Winston** - Logging library
- **express-validator** - Request validation

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **PostgreSQL** 14+ (optional - currently using in-memory storage)
- **Redis** 6+ (optional - for caching)
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/grammerpro/cms-analytics-dashboard.git
cd cms-analytics-dashboard
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Environment Configuration

**Server Configuration:**

Copy the example environment file and configure:

```bash
cd server
cp .env.example .env
```

Then edit `server/.env` with your settings. See `.env.example` for all available options.

**Client Configuration** (optional):

```bash
cd client
cp .env.example .env
```

Key environment variables:
- `PORT` - Server port (default: 5001)
- `JWT_SECRET` - Secret key for JWT tokens (required for production)
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string (optional)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:3000)

### 4. Run Development Servers

**Option A: Run both servers simultaneously**

From the root directory:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

**Option B: Using Docker (if configured)**
```bash
docker-compose up
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health
- **API Documentation**: See [API Endpoints](#-api-endpoints) section below

## 🔨 Build for Production

### Build Frontend
```bash
cd client
npm run build
# Output in client/dist/ (678KB bundled, 199KB gzipped)
```

### Build Backend
```bash
cd server
npm run build
# Output in server/dist/
```

### Run Production Build
```bash
# Backend
cd server
npm start

# Frontend (serve with a static server)
cd client
npx serve dist -p 3000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tenants
- `GET /api/tenants` - Get all tenants
- `GET /api/tenants/:id` - Get tenant by ID
- `POST /api/tenants` - Create new tenant
- `PUT /api/tenants/:id` - Update tenant
- `DELETE /api/tenants/:id` - Delete tenant

### Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Analytics
- `GET /api/analytics/:tenantId` - Get analytics for tenant

### Health & Monitoring
- `GET /api/health` - Health check with database status
- `GET /api/health/ready` - Readiness probe (K8s compatible)
- `GET /api/health/live` - Liveness probe (K8s compatible)
- `POST /api/analytics` - Create analytics data
- `PUT /api/analytics/:id` - Update analytics
- `DELETE /api/analytics/:id` - Delete analytics

## 🎨 Key Features Demo

### Real-Time Analytics
The dashboard displays live metrics that update automatically via WebSocket:
- Active users count
- Page views
- Real-time notifications
- Live data streaming

### Multi-Tenant Support
Each tenant has isolated data and customizable settings:
- Tenant-specific content
- Custom branding (configurable)
- Per-tenant analytics

### Role-Based Access
Three permission levels:
- **Admin** - Full access to all features
- **Editor** - Can create and edit content
- **Viewer** - Read-only access

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Scripts

### Client
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm run type-check` - Check TypeScript types without building
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run type-check` - Check TypeScript types without building
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test:health` - Quick health check (requires server running)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- grammerpro - [GitHub Profile](https://github.com/grammerpro)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- Tailwind CSS for the utility-first approach
- Socket.IO for real-time capabilities

## 📧 Support

For support, email vardhana1209@gmail.com or open an issue in the GitHub repository.

---

**Built with ❤️ using TypeScript, React, and Node.js**