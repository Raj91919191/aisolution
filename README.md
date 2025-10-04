# 🚀 AI Solutions - Premium Digital Agency Website

A modern, full-stack web application showcasing AI-powered digital solutions with an interactive chatbot, portfolio management, and admin dashboard.

## ✨ Features

### 🎯 Core Features
- **Interactive AI Chatbot (AURA)** - Intelligent conversational assistant
- **Portfolio Showcase** - Client success stories with metrics
- **Admin Dashboard** - Content management system
- **Responsive Design** - Mobile-first approach
- **Modern Animations** - Framer Motion powered interactions
- **Professional UI/UX** - Tailwind CSS styling

### 🤖 AI Components
- Advanced chatbot with contextual responses
- Portfolio information integration
- Service recommendations
- Contact assistance

### 📊 Portfolio Solutions
1. **DocuMind** - AI enterprise documentation assistant
2. **Log AI** - Intelligent inventory management
3. **FinSight** - AI financial insights platform
4. **LaundriQ** - Smart laundry care system (Samsung partnership)
5. **SafeOps** - AI workplace safety monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **JWT** authentication
- **JSON file storage** for data
- **CORS** enabled
- **Compression** middleware

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Nodemon** for development
- **Concurrently** for parallel processes

## 📁 Project Structure

```
project/
├── public/
│   └── assets/
│       └── images/
│           └── logo.svg          # Professional SVG logo
├── src/
│   ├── components/
│   │   ├── AILogo.tsx           # Enhanced logo component
│   │   ├── ChatBot.tsx          # AURA AI assistant
│   │   ├── Header.tsx           # Navigation header
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx             # AI video & hero section
│   │   ├── Portfolio.tsx        # Client solutions
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── ContactContext.tsx   # Contact management
│   ├── constants/
│   │   └── index.ts             # App constants & configs
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── utils/
│   │   └── index.ts             # Helper functions
│   └── ...
├── server/
│   ├── data/                    # JSON data files
│   └── index.js                 # Express server
└── ...
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root with the following variables:
   ```
   VITE_API_URL=http://localhost:4000
   PORT=4000
   JWT_SECRET=your_secure_jwt_secret_here
   ```

   For production deployment, create a `.env.production` file with:
   ```
   # Production Environment Variables
   # Update these values for your specific deployment

   # Frontend API URL - Update with your actual domain
   VITE_API_URL=https://your-domain.com

   # Backend server port
   PORT=4000

   # JWT Secret - Use a strong, random secret in production
   JWT_SECRET=your_production_jwt_secret_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5176`
   - Backend API: `http://localhost:4000`

### Available Scripts

```bash
# Development
npm run dev          # Start both client and server
npm run dev:client   # Start only frontend
npm run dev:server   # Start only backend

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Design System

### Colors
- **Primary**: Cyan/Blue gradient system
- **Secondary**: Purple accents
- **Background**: Dark theme with glass morphism
- **Text**: White/Gray hierarchy

### Typography
- **Headings**: Bold, gradient text
- **Body**: Clean, readable fonts
- **Code**: Monospace for technical content

### Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Glass morphism with subtle borders
- **Animations**: Smooth, purposeful transitions

## 🔧 Configuration

### Environment Variables
```env
PORT=4000
JWT_SECRET=your_secret_key_here
```

### Logo Variants
The AILogo component supports multiple variants:
- `full` - Complete logo with image and text
- `icon-only` - Just the AI symbol
- `text-only` - Company name only

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 📱 Features Overview

### 🏠 Homepage
- Hero section with animated logo
- AI documentary video (National Geographic)
- Service features grid
- Statistics section
- Call-to-action

### 🤖 AURA Chatbot
- Contextual AI responses
- Portfolio information
- Service recommendations
- Contact assistance
- Typing indicators
- Smooth animations

### 📁 Portfolio
- 5 featured client solutions
- Detailed project metrics
- Technology stacks
- Success stories
- Interactive filters

### ⚙️ Admin Dashboard
- Contact management
- Content administration
- User authentication
- Analytics overview

## 🔒 Authentication

### Default Admin Credentials
- **Email**: `admin@aisolutions.com`
- **Password**: `Admin@2024!`

### Moderator Access
- **Email**: `moderator@aisolutions.com`
- **Password**: `Mod@2024!`

## 🌐 API Endpoints

### Public Routes
```
GET  /api/health          # Health check
GET  /api/events          # Get events
GET  /api/gallery         # Get gallery items
GET  /api/services        # Get services
GET  /api/portfolio       # Get portfolio
GET  /api/blogs           # Get blog posts
POST /api/contacts        # Submit contact form
POST /api/auth/login      # User authentication
```

### Protected Routes (Require Authentication)
```
GET  /api/contacts        # Get contacts (admin only)
POST /api/events          # Create event
POST /api/services        # Create service
POST /api/gallery         # Create gallery item
POST /api/portfolio       # Create portfolio item
POST /api/blogs           # Create blog post
```

## 📈 Performance Optimizations

- **Vite** for fast builds and HMR
- **Lazy loading** for route components
- **Image optimization** with proper formats
- **Code splitting** for better loading
- **Compression** middleware
- **Efficient animations** with Framer Motion

## 🗺️ System Architecture
- [Final Combined Architecture Diagram](./docs/final-architecture-diagram.md)
- [Final Interactive Combined Diagram](./docs/final-interactive-diagram.html)
- [Data Flow Diagram (DFD)](./docs/dfd-diagram.html)

## 🎯 Best Practices

### Code Organization
- **Component separation** by functionality
- **Custom hooks** for reusable logic
- **Type safety** with TypeScript
- **Consistent naming** conventions

### Performance
- **Memoization** for expensive computations
- **Intersection Observer** for scroll animations
- **Debounced inputs** for search functionality
- **Optimized re-renders** with React best practices

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port
   npx kill-port 5176
   ```

2. **Node modules issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm run build
   ```

## 📞 Support

For questions or support:
- **Email**: ydraju1429@gmail.com
- **Phone**: +977-9829798238
- **Location**: Tinkune, Kathmandu, Nepal

## 📄 License

This project is proprietary software developed for AI Solutions.

---

**Built with ❤️ by AI Solutions Team**

*"Your Dream, Our Passion"*

## 📋 Documentation

Detailed documentation is available in the [docs](./docs) directory:

- [User Manual](./docs/user-manual.md) - Guide for website users
- [Admin Manual](./docs/admin-manual.md) - Guide for administrators
- [Documentation README](./docs/README.md) - Overview of all documentation

Additional technical documentation includes:
- [Architecture Diagrams](./docs/architecture-diagrams.md)
- [Deployment Guide](./docs/5.4-deployment-guide.md)
- [Technical Deployment](./docs/technical-deployment.md)

---
## 🌐 Deployment

### Vercel Deployment

1. **Configure Environment Variables**
   In your Vercel project settings, go to "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-app-name.vercel.app
   PORT=4000
   JWT_SECRET=your_secure_jwt_secret_here
   ```

2. **Deploy**
   - Connect your Git repository to Vercel
   - Click "Deploy" to start the deployment process
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be available at a vercel.app subdomain

### Manual Deployment

For traditional server deployment:
1. Update your system and install Node.js
2. Clone the repository to your server
3. Install production dependencies with `npm install --production`
4. Build the frontend with `npm run build`
5. Configure environment variables in `.env.production`
6. Start the server with `npm start`
7. Set up a reverse proxy (Nginx/Apache) to serve the built files
8. Configure SSL certificates for HTTPS
