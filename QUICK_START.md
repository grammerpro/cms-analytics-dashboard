# 🚀 Quick Start Guide

## Application is Running!

### 🌐 Access Points
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001
- **WebSocket:** ws://localhost:5001

---

## ✅ What's Working Right Now

### Backend (Port 5001) ✅
- ✅ Express server running
- ✅ WebSocket server active
- ✅ All API routes configured
- ✅ CORS enabled for localhost:3000
- ⚠️ Database disconnected (PostgreSQL not installed)
- ✅ Server continues running without database

### Frontend (Port 3000) ✅
- ✅ React app running with Vite
- ✅ All pages accessible
- ✅ Login page at `/login`
- ✅ Register page at `/register`
- ✅ Dashboard redirects to login (auth required)
- ✅ All components rendering correctly

---

## 🎯 Current Functionality

### Without Database (Current State)
Since PostgreSQL is not installed, the following features work with limitations:

**Working:**
- ✅ Frontend navigation
- ✅ Page rendering
- ✅ UI components
- ✅ Form validation
- ✅ WebSocket connection
- ✅ Mock dashboard data
- ✅ Mock analytics data

**Limited (Requires Database):**
- ⚠️ User registration - API returns error
- ⚠️ User login - API returns error
- ⚠️ Data persistence - No storage
- ⚠️ Protected routes - Can't verify tokens

---

## 💾 To Enable Full Functionality

### Option 1: Install PostgreSQL (Recommended)

1. **Download PostgreSQL 14+**
   - Windows: https://www.postgresql.org/download/windows/
   - Or use installer: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Install and Create Database**
   ```bash
   # After installation, open psql or pgAdmin
   CREATE DATABASE cms_analytics_db;
   ```

3. **Update Environment Variables**
   ```bash
   # Edit server/.env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cms_analytics_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   ```

4. **Restart Server**
   ```bash
   # The server will automatically:
   # - Connect to database
   # - Run migrations
   # - Seed sample data
   ```

5. **Login with Demo Account**
   ```
   Email: admin@demo.com
   Password: password123
   ```

### Option 2: Continue Without Database

The application works without PostgreSQL for:
- Frontend development
- UI/UX testing
- Component development
- Mock data testing

---

## 🔑 Demo Accounts (After DB Setup)

Once PostgreSQL is configured, you can use these accounts:

### Admin Account
```
Email: admin@demo.com
Password: password123
Role: admin
Tenant: Demo Tenant
```

### Editor Account
```
Email: editor@demo.com
Password: password123
Role: editor
Tenant: Demo Tenant
```

### Viewer Account
```
Email: viewer@demo.com
Password: password123
Role: viewer
Tenant: Demo Tenant
```

### Acme Corp Admin
```
Email: admin@acme.com
Password: password123
Role: admin
Tenant: Acme Corp
```

---

## 📱 Application Features

### Pages Available
1. **Login** (`/login`)
   - Email/password authentication
   - Client-side validation
   - Error handling
   - Link to registration

2. **Register** (`/register`)
   - New user registration
   - Password confirmation
   - Role selection
   - Tenant ID input

3. **Dashboard** (`/dashboard`)
   - Overview metrics
   - Real-time analytics
   - Content statistics
   - Quick actions

4. **Analytics** (`/analytics`)
   - Charts and graphs
   - Page views tracking
   - Bounce rate analysis
   - Time on page metrics

5. **Content** (`/content`)
   - Content listing
   - Create/Edit/Delete
   - Status management (draft/published/archived)
   - Search functionality

6. **Settings** (`/settings`)
   - User preferences
   - Tenant configuration
   - Application settings

### Navigation Features
- ✅ Sidebar navigation
- ✅ Mobile responsive menu
- ✅ Breadcrumbs
- ✅ Keyboard shortcuts (Ctrl+D, Ctrl+A, Ctrl+C, Ctrl+S, Ctrl+K)
- ✅ User menu with logout
- ✅ 404 error page

---

## 🛠️ Development Commands

### Backend Server
```bash
cd cms-analytics-dashboard/server

# Start development server (currently running)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend
```bash
cd cms-analytics-dashboard/client

# Start development server (currently running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Both Servers
```bash
# From root directory
npm run dev
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5001 is already in use
netstat -ano | findstr :5001

# Kill the process if needed
taskkill /PID <process_id> /F

# Restart server
cd server
npm run dev
```

### Frontend Won't Start
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <process_id> /F

# Restart server
cd client
npm run dev
```

### Database Connection Issues
```bash
# Verify PostgreSQL is running
# Windows: Check Services > postgresql-x64-14

# Test connection
psql -U postgres -d cms_analytics_db

# Check .env file has correct credentials
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
```

### TypeScript Errors
```bash
# Rebuild
npm run build

# Check for errors
npx tsc --noEmit
```

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register    - Create new user
POST   /api/auth/login       - Authenticate user
POST   /api/auth/logout      - Logout user (requires auth)
GET    /api/auth/me          - Get current user (requires auth)
```

### Tenants
```
GET    /api/tenants          - List all tenants (requires auth)
GET    /api/tenants/:id      - Get tenant by ID (requires auth)
POST   /api/tenants          - Create tenant (requires auth, admin)
PUT    /api/tenants/:id      - Update tenant (requires auth, admin)
DELETE /api/tenants/:id      - Delete tenant (requires auth, admin)
```

### Content
```
GET    /api/content          - List all content (requires auth)
GET    /api/content/:id      - Get content by ID (requires auth)
POST   /api/content          - Create content (requires auth)
PUT    /api/content/:id      - Update content (requires auth)
DELETE /api/content/:id      - Delete content (requires auth)
```

### Analytics
```
GET    /api/analytics        - Get analytics data (requires auth)
POST   /api/analytics        - Record analytics (requires auth)
```

---

## 🎨 Tech Stack

### Frontend
- React 18.0.0
- TypeScript 4.x
- Vite 4.5.14
- Tailwind CSS 3.3.0
- React Router 6.0.0
- Redux Toolkit 2.9.0
- Recharts 2.0.0
- Socket.IO Client
- React Hot Toast
- Day.js

### Backend
- Node.js 22.12.0
- Express 4.17.1
- TypeScript 4.9.5
- PostgreSQL 14+ (pg-promise)
- Socket.IO 3.x
- JWT (jsonwebtoken)
- Bcrypt
- Express Validator
- Winston (planned)

---

## 📈 Application Status

**Status:** ✅ Running Successfully  
**Frontend:** ✅ Online at http://localhost:3000  
**Backend:** ✅ Online at http://localhost:5001  
**WebSocket:** ✅ Connected  
**Database:** ⚠️ Not configured (optional for development)  

---

## 💡 Tips

1. **Use Browser DevTools** - Open Chrome DevTools (F12) to see:
   - Network requests
   - Console logs
   - React components
   - WebSocket messages

2. **Check Terminal Output** - Watch both terminal windows for:
   - API requests
   - Error messages
   - WebSocket connections
   - Database queries (when DB connected)

3. **Hot Reload** - Both servers support hot reload:
   - Save files to see changes instantly
   - No need to restart servers

4. **Keyboard Shortcuts**:
   - `Ctrl+D` - Dashboard
   - `Ctrl+A` - Analytics
   - `Ctrl+C` - Content
   - `Ctrl+S` - Settings
   - `Ctrl+K` - Search

---

## 🎉 You're All Set!

The application is running and ready for development. Visit http://localhost:3000 to get started!

**Current Limitations:**
- Authentication requires PostgreSQL database
- Data is not persisted without database
- Some API endpoints will return errors

**To unlock all features:**
- Install PostgreSQL
- Run migrations
- Use demo accounts to login

---

## 📞 Need Help?

- **Documentation:** See README.md, PHASE1_COMPLETED.md
- **Implementation Guide:** See PHASE1_IMPLEMENTATION.md
- **GitHub:** https://github.com/grammerpro/cms-analytics-dashboard
- **Quick Wins:** See QUICK_WINS_IMPLEMENTATION.md

---

**Last Updated:** October 21, 2025  
**Version:** Phase 1 Complete
