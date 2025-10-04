import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import RouteProgress from './components/RouteProgress';
import FloatingPhoneButton from './components/FloatingPhoneButton';
import BubbleBackground from './components/BubbleBackground';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Events = lazy(() => import('./pages/Events'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const Feedback = lazy(() => import('./pages/Feedback'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const VirtualAssistant = lazy(() => import('./components/VirtualAssistant'));
import { AuthProvider } from './contexts/AuthContext';
import { ContactProvider } from './contexts/ContactContext';

// Optimized loading component with minimal overhead
const LoadingFallback = () => (
  <div className="pt-24 text-center text-white/80 min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-white/60 text-sm">
        Loading...
      </p>
    </div>
  </div>
);

// Simple page wrapper without animations for better performance
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {/* Global Water Bubble Background Animation - Performance Optimized */}
      <BubbleBackground bubbleCount={15} />
      {children}
    </div>
  );
};

// Routes wrapper without animations
const RoutesWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminRoute && <Header />}
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="/blogs" element={<PageWrapper><Blogs /></PageWrapper>} />
          <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
          <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/feedback" element={<PageWrapper><Feedback /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          </Route>
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && (
        <Suspense fallback={null}>
          <VirtualAssistant />
          <FloatingPhoneButton />
        </Suspense>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <RouteProgress />
            <main className="relative">
              <RoutesWrapper />
            </main>
          </div>
          {null}
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;