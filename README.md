<div align="center">

# 📊 Multi-Tenant CMS Analytics Dashboard

![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A production-ready full-stack CMS with real-time analytics, multi-tenant architecture, and role-based access control — TypeScript throughout the entire stack.**

[🐛 Report Bug](https://github.com/grammerpro/cms-analytics-dashboard/issues) · [💡 Request Feature](https://github.com/grammerpro/cms-analytics-dashboard/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- - [Features](#-features)
  - - [Tech Stack](#-tech-stack)
    - - [Getting Started](#-getting-started)
      - - [Project Structure](#-project-structure)
        - - [API Reference](#-api-reference)
          - - [Roadmap](#-roadmap)
            - - [Contributing](#-contributing)
              - - [License](#-license)
               
                - ---

                ## 🔍 About

                A full-stack Content Management System built with modern web technologies, featuring real-time analytics powered by WebSocket (Socket.IO), complete multi-tenant data isolation, JWT authentication, and a role-based permission system. All data is persisted in PostgreSQL with complete CRUD APIs.

                > **Status:** Phase 1 complete — PostgreSQL integration, authentication, protected routes, and user session management are all live.
                >
                > ---
                >
                > ## ✨ Features
                >
                > **Core Platform**
                > - 🏢 **Multi-Tenant Architecture** — Complete tenant isolation with per-tenant data management
                > - - 📈 **Real-Time Analytics** — Live page views and active user tracking via WebSocket
                >   - - 🔐 **RBAC** — Admin, Editor, and Viewer roles with granular permissions
                >     - - 🔑 **JWT Authentication** — Secure token-based auth with refresh flow
                >       - - 📝 **Content Management** — Full CRUD with versioning support
                >        
                >         - **Technical Highlights**
                >         - - TypeScript end-to-end (React frontend + Express backend)
                >           - - Redux Toolkit for client state + TanStack Query for server state
                >             - - Recharts for interactive data visualizations
                >               - - Docker Compose for one-command local setup
                >                 - - Kubernetes-compatible health endpoints (`/health/ready`, `/health/live`)
                >                  
                >                   - ---
                >
                > ## 🛠️ Tech Stack
                >
                > | Layer | Technology |
                > |-------|-----------|
                > | Frontend | React 18 · TypeScript · Vite · Tailwind CSS |
                > | State | Redux Toolkit · TanStack Query (React Query) |
                > | Charts | Recharts 2.0 |
                > | Real-time | Socket.IO |
                > | Backend | Node.js 22 · Express 4 · TypeScript |
                > | Auth | JWT · bcrypt |
                > | Database | PostgreSQL |
                > | Caching | Redis (optional) |
                > | Containerization | Docker · Docker Compose |
                >
                > ---
                >
                > ## 🚀 Getting Started
                >
                > ### Prerequisites
                >
                > - Node.js 18+
                > - - PostgreSQL 14+
                >   - - Redis 6+ *(optional)*
                >    
                >     - ### Installation
                >    
                >     - ```bash
                >       git clone https://github.com/grammerpro/cms-analytics-dashboard.git
                >       cd cms-analytics-dashboard
                >
                >       # Install all dependencies
                >       npm install && cd client && npm install && cd ../server && npm install && cd ..
                >       ```
                >
                > **Configure the server:**
                >
                > ```bash
                > cd server
                > cp .env.example .env
                > # Edit .env with your database credentials and JWT secret
                > ```
                >
                > **Run development servers:**
                >
                > ```bash
                > # Terminal 1 — Backend
                > cd server && npm run dev
                >
                > # Terminal 2 — Frontend
                > cd client && npm run dev
                > ```
                >
                > | Service | URL |
                > |---------|-----|
                > | Frontend | http://localhost:3000 |
                > | Backend API | http://localhost:5001 |
                > | Health Check | http://localhost:5001/api/health |
                >
                > **Or use Docker:**
                >
                > ```bash
                > docker-compose up
                > ```
                >
                > ---
                >
                > ## 📁 Project Structure
                >
                > ```
                > cms-analytics-dashboard/
                > ├── client/                  # React frontend
                > │   └── src/
                > │       ├── components/      # analytics/, auth/, layout/, tenant/
                > │       ├── hooks/           # Custom React hooks
                > │       ├── pages/           # Page components
                > │       ├── store/           # Redux slices
                > │       └── services/        # API service layer
                > ├── server/                  # Node.js/Express backend
                > │   └── src/
                > │       ├── controllers/     # Request handlers
                > │       ├── middleware/      # Auth, validation
                > │       ├── routes/          # API route definitions
                > │       └── services/        # Business logic
                > ├── shared/                  # Shared TypeScript types
                > └── docker-compose.yml
                > ```
                >
                > ---
                >
                > ## 📚 API Reference
                >
                > <details>
                  <summary><strong>Authentication</strong>strong></summary>summary>
                  
                  | Method | Endpoint | Description |
                |--------|----------|-------------|
                | POST | `/api/auth/register` | Register new user |
                | POST | `/api/auth/login` | User login |
                | POST | `/api/auth/logout` | User logout |
                </details>
                
                <details>
                  <summary><strong>Tenants, Content & Analytics</strong>strong></summary>summary>
             
                  | Method | Endpoint | Description |
                |--------|----------|-------------|
                | GET/POST | `/api/tenants` | List / create tenants |
                | GET/PUT/DELETE | `/api/tenants/:id` | Read / update / delete tenant |
                | GET/POST | `/api/content` | List / create content |
                | GET | `/api/analytics/:tenantId` | Get tenant analytics |
                | GET | `/api/health` | Health check with DB status |
                </details>
             
                ---
             
                ## 🗺️ Roadmap
             
                - [ ] Phase 2: Content versioning & approval workflow
                - [ ] - [ ] Phase 3: Custom tenant branding
                - [ ] - [ ] Role management UI for Admins
                - [ ] - [ ] Advanced analytics with date range filtering
                - [ ] - [ ] Webhook support for CMS events
               
                - [ ] ---
               
                - [ ] ## 🤝 Contributing
               
                - [ ] 1. Fork the repository
                - [ ] 2. Create a branch: `git checkout -b feature/your-idea`
                - [ ] 3. Commit: `git commit -m 'feat: describe your change'`
                - [ ] 4. Ensure tests pass: `npm test`
                - [ ] 5. Open a Pull Request
               
                - [ ] ---
               
                - [ ] ## 📄 License & Contact
               
                - [ ] Released under the **MIT License**.
               
                - [ ] **Vardhan** · [vardhana1209@gmail.com](mailto:vardhana1209@gmail.com) · [github.com/grammerpro](https://github.com/grammerpro)
                </summary>
                </details>
