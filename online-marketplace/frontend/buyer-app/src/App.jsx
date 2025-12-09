// src/App.jsx - Cleaned Version
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Categories from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Categories />

          <div className="main-content">
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <div className="home-page">
                    <h1>🛍️ Welcome to Atlantica Store</h1>
                    <p>
                      Select a category from the navigation bar above to start
                      shopping
                    </p>
                    <div className="home-features">
                      <div className="feature-card">
                        <h3>🎯 Shop by Category</h3>
                        <p>
                          Browse our wide range of categories and find exactly
                          what you need
                        </p>
                      </div>
                      <div className="feature-card">
                        <h3>🚚 Fast Delivery</h3>
                        <p>Enjoy free delivery on orders above EGP 500</p>
                      </div>
                      <div className="feature-card">
                        <h3>⭐ Customer Reviews</h3>
                        <p>Read genuine reviews from verified customers</p>
                      </div>
                    </div>
                  </div>
                }
              />

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
              <Route
                path="/orders"
                element={
                  <div className="page-container">
                    <h1>📦 Your Orders</h1>
                    <p>
                      No orders yet. Start shopping to see your orders here!
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
