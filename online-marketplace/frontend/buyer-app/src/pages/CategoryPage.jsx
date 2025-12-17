// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categorySlug, subcategorySlug, childSlug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    price: "all",
    rating: [],
    sortBy: "featured",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    setSelectedCategory(category);

    if (category) {
      if (subcategorySlug) {
        const subcategory = category.subcategories.find(
          (sub) => sub.slug === subcategorySlug
        );
        setSelectedSubcategory(subcategory);

        if (childSlug && subcategory?.children) {
          const child = subcategory.children.find(
            (child) => child.slug === childSlug
          );
          setSelectedChild(child);
          const productsData = getProductsByCategory(childSlug);
          setProducts(productsData);
          setCurrentSubcategories([]);
        } else if (subcategory?.children && !childSlug) {
          setSelectedChild(null);
          setCurrentSubcategories(subcategory.children);
          setProducts([]);
        } else if (subcategory && !subcategory.children) {
          setSelectedChild(null);
          setCurrentSubcategories([]);
          const productsData = getProductsByCategory(subcategorySlug);
          setProducts(productsData);
        }
      } else {
        setSelectedSubcategory(null);
        setSelectedChild(null);
        setCurrentSubcategories(category.subcategories);
        setProducts([]);
      }
    }
  }, [categorySlug, subcategorySlug, childSlug]);

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (filters.price !== "all") {
      switch (filters.price) {
        case "under500":
          filtered = filtered.filter((p) => p.price < 500);
          break;
        case "500-1000":
          filtered = filtered.filter((p) => p.price >= 500 && p.price <= 1000);
          break;
        case "1000-5000":
          filtered = filtered.filter((p) => p.price >= 1000 && p.price <= 5000);
          break;
        case "over5000":
          filtered = filtered.filter((p) => p.price > 5000);
          break;
        default:
          break;
      }
    }

    if (filters.rating.length > 0) {
      if (filters.rating.includes("4")) {
        filtered = filtered.filter((p) => p.rating >= 4);
      }
      if (filters.rating.includes("3")) {
        filtered = filtered.filter((p) => p.rating >= 3);
      }
    }

    switch (filters.sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleFilterChange = (type, value) => {
    if (type === "price") {
      setFilters((prev) => ({ ...prev, price: value }));
      setCurrentPage(1);
    } else if (type === "rating") {
      setFilters((prev) => {
        const newRating = prev.rating.includes(value)
          ? prev.rating.filter((r) => r !== value)
          : [...prev.rating, value];
        return { ...prev, rating: newRating };
      });
      setCurrentPage(1);
    } else if (type === "sort") {
      setFilters((prev) => ({ ...prev, sortBy: value }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-EG");
  };

  if (!selectedCategory) {
    return <div className="loading">Loading...</div>;
  }

  const buildBreadcrumb = () => {
    const breadcrumb = [
      <Link key="home" to="/">
        Home
      </Link>,
      <span key="sep1"> › </span>,
      <Link key="category" to={`/category/${categorySlug}`}>
        {selectedCategory.name}
      </Link>,
    ];

    if (selectedSubcategory) {
      breadcrumb.push(<span key="sep2"> › </span>);
      if (selectedChild) {
        breadcrumb.push(
          <Link
            key="subcategory"
            to={`/category/${categorySlug}/${subcategorySlug}`}
          >
            {selectedSubcategory.name}
          </Link>
        );
        breadcrumb.push(<span key="sep3"> › </span>);
        breadcrumb.push(<span key="child">{selectedChild.name}</span>);
      } else {
        breadcrumb.push(
          <span key="subcategory">{selectedSubcategory.name}</span>
        );
      }
    }

    return breadcrumb;
  };

  const shouldShowSubcategories =
    currentSubcategories.length > 0 && products.length === 0;

  if (shouldShowSubcategories) {
    return (
      <div className="category-page">
        <div className="breadcrumb">{buildBreadcrumb()}</div>

        <div className="subcategories-container">
          <h1 className="page-title">
            {selectedSubcategory
              ? `${selectedSubcategory.name} Categories`
              : `${selectedCategory.name} Categories`}
          </h1>

          <div className="subcategories-grid">
            {currentSubcategories.map((sub) => {
              let linkPath;
              if (selectedSubcategory && selectedSubcategory.children) {
                linkPath = `/category/${categorySlug}/${subcategorySlug}/${sub.slug}`;
              } else {
                linkPath = `/category/${categorySlug}/${sub.slug}`;
              }

              return (
                <Link key={sub.id} to={linkPath} className="subcategory-card">
                  <div className="subcategory-card-image">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                          sub.name
                        )}`;
                      }}
                    />
                  </div>
                  <div className="subcategory-card-content">
                    <h3 className="subcategory-card-title">{sub.name}</h3>
                    <span className="subcategory-card-link">Shop Now →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="breadcrumb">{buildBreadcrumb()}</div>

      <div className="category-content">
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          {/* Department Filter */}
          {selectedCategory && selectedCategory.subcategories && (
            <div className="filter-section">
              <h4>Department</h4>
              <ul className="filter-list">
                {selectedCategory.subcategories.map((sub) => {
                  if (sub.children) {
                    return (
                      <li key={sub.id}>
                        <Link
                          to={`/category/${categorySlug}/${sub.slug}`}
                          className={
                            selectedSubcategory?.slug === sub.slug
                              ? "active"
                              : ""
                          }
                        >
                          {sub.name}
                        </Link>
                        {selectedSubcategory?.slug === sub.slug &&
                          sub.children && (
                            <ul className="filter-sublist">
                              {sub.children.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    to={`/category/${categorySlug}/${sub.slug}/${child.slug}`}
                                    className={
                                      selectedChild?.slug === child.slug
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    );
                  } else {
                    return (
                      <li key={sub.id}>
                        <Link
                          to={`/category/${categorySlug}/${sub.slug}`}
                          className={
                            selectedSubcategory?.slug === sub.slug
                              ? "active"
                              : ""
                          }
                        >
                          {sub.name}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}

          {/* Price Filter */}
          <div className="filter-section">
            <h4>Price</h4>
            <label>
              <input
                type="radio"
                name="price"
                value="all"
                checked={filters.price === "all"}
                onChange={() => handleFilterChange("price", "all")}
              />
              All Prices
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="under500"
                checked={filters.price === "under500"}
                onChange={() => handleFilterChange("price", "under500")}
              />
              Under EGP 500
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="500-1000"
                checked={filters.price === "500-1000"}
                onChange={() => handleFilterChange("price", "500-1000")}
              />
              EGP 500 - 1,000
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="1000-5000"
                checked={filters.price === "1000-5000"}
                onChange={() => handleFilterChange("price", "1000-5000")}
              />
              EGP 1,000 - 5,000
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="over5000"
                checked={filters.price === "over5000"}
                onChange={() => handleFilterChange("price", "over5000")}
              />
              Over EGP 5,000
            </label>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h4>Customer Review</h4>
            <label>
              <input
                type="checkbox"
                checked={filters.rating.includes("4")}
                onChange={() => handleFilterChange("rating", "4")}
              />
              <span className="rating-stars">★★★★</span> & Up
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.rating.includes("3")}
                onChange={() => handleFilterChange("rating", "3")}
              />
              <span className="rating-stars">★★★</span> & Up
            </label>
          </div>
        </aside>

        <main className="products-section">
          <div className="products-header">
            <h1>
              {selectedChild
                ? selectedChild.name
                : selectedSubcategory
                ? selectedSubcategory.name
                : selectedCategory.name}
            </h1>
            <div className="sort-options">
              <label>Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="products-count">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </div>

          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="product-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/200x200?text=Product`;
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">
                        {renderStars(product.rating)}
                      </span>
                      <span className="review-count">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">
                        EGP {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">
                          EGP {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="delivery-info">{product.delivery}</p>
                    <div className="product-brand">
                      <span className="brand-tag">Brand: {product.brand}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-products">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`pagination-btn ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
