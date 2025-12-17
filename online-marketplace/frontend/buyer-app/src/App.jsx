// src/App.jsx - Cleaned Version
import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Categories from "./components/Categories";
import { categories } from "./data/categories";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import OrdersPage from "./pages/OrdersPage";
import Login from "./pages/Login/Login";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import "./App.css";

// Create context for navigation toggle
export const NavigationContext = createContext();

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isMarketPlacePage = location.pathname === '/marketplace';
  const [showNavigation, setShowNavigation] = React.useState(false);

  const scrollToCategories = () => {
    const element = document.getElementById('home-categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide navigation on login and marketplace pages (unless toggled on)
  const shouldShowNav = !isLoginPage && (!isMarketPlacePage || showNavigation);

  return (
    <NavigationContext.Provider value={{ showNavigation, setShowNavigation }}>
      <div className="App">
        {shouldShowNav && <Header />}
        {shouldShowNav && <Categories />}

        <div className="main-content">
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* MarketPlace Page */}
            <Route path="/marketplace" element={<MarketPlace />} />

            {/* Root redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Category Routes */}
            <Route
              path="/category/:categorySlug"
              element={<CategoryPage />}
            />
            <Route
              path="/category/:categorySlug/:subcategorySlug"
              element={<CategoryPage />}
            />
            <Route
              path="/category/:categorySlug/:subcategorySlug/:childSlug"
              element={<CategoryPage />}
            />

            {/* Product Detail */}
            <Route
              path="/product/:productId"
              element={<ProductDetailPage />}
            />

            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Orders */}
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
