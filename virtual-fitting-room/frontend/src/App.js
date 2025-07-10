import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import AvatarPage from './pages/AvatarPage';
import TryOnPage from './pages/TryOnPage';
import SuggestedLooksPage from './pages/SuggestedLooksPage';
import CatalogPage from './pages/CatalogPage';

// Context
import { UserProvider } from './context/UserContext';
import { ClothingProvider } from './context/ClothingContext';

function App() {
  return (
    <UserProvider>
      <ClothingProvider>
        <div className="App min-h-screen bg-neutral-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="avatar" element={<AvatarPage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="try-on" element={<TryOnPage />} />
                <Route path="suggested-looks" element={<SuggestedLooksPage />} />
              </Route>
            </Routes>
          </motion.div>
        </div>
      </ClothingProvider>
    </UserProvider>
  );
}

export default App;