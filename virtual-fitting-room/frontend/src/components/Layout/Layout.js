import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Shirt,
  Camera,
  Sparkles,
  Menu,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, hasCompletedOnboarding, clearUser } = useUser();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Get Started', href: '/onboarding', icon: User },
    { name: 'My Avatar', href: '/avatar', icon: Camera },
    { name: 'Catalog', href: '/catalog', icon: Shirt },
    { name: 'Try On', href: '/try-on', icon: ShoppingBag },
    { name: 'Suggested Looks', href: '/suggested-looks', icon: Sparkles },
  ];

  const handleLogout = () => {
    clearUser();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-neutral-200 sticky top-0 z-40">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 hidden sm:block">
                Virtual Fitting Room
              </span>
              <span className="text-xl font-bold text-neutral-900 block sm:hidden">
                VFR
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu / CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-neutral-600">
                    Welcome back!
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline text-xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/onboarding" className="btn-primary">
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-neutral-200"
            >
              <div className="section-padding py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-neutral-200">
                  {currentUser ? (
                    <button
                      onClick={handleLogout}
                      className="w-full btn-outline justify-center"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/onboarding"
                      onClick={closeMobileMenu}
                      className="w-full btn-primary justify-center"
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Progress Indicator (only show during onboarding) */}
      {location.pathname.includes('onboarding') && (
        <div className="bg-primary-50 border-b border-primary-200">
          <div className="container-max section-padding py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-700 font-medium">
                Setting up your profile
              </span>
              <span className="text-primary-600">
                Step 1 of 3
              </span>
            </div>
            <div className="mt-2 w-full bg-primary-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full w-1/3 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="container-max section-padding py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-neutral-900">
                  Virtual Fitting Room
                </span>
              </div>
              <p className="text-neutral-600 max-w-md">
                Try on clothes virtually using AI-powered avatar technology. 
                Find your perfect fit before you buy.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Product</h3>
              <ul className="space-y-2 text-neutral-600">
                <li><Link to="/catalog" className="hover:text-neutral-900">Browse Catalog</Link></li>
                <li><Link to="/try-on" className="hover:text-neutral-900">Virtual Try-On</Link></li>
                <li><Link to="/suggested-looks" className="hover:text-neutral-900">Style Suggestions</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-neutral-900">Help Center</a></li>
                <li><a href="#" className="hover:text-neutral-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-neutral-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-neutral-500">
            <p>&copy; 2024 Virtual Fitting Room. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;