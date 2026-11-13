
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, SlidersHorizontal } from "lucide-react";

import { getProducts } from "../services/productService";
import {
  getFavorites,
  toggleFavorite,
} from "../services/favoriteService";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // Advanced filter states
const [selectedBrand, setSelectedBrand] = useState("all");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [minRating, setMinRating] = useState("all");
const [inStockOnly, setInStockOnly] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Reset to page 1 whenever filters change
  

  // Get available categories
  const categories = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.category)),
    ].sort();
  }, [products]);

  // Get available brands
const brands = useMemo(() => {
  return [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ].sort();
}, [products]);

  // Search, filter, and sort products
 
// Search, filter, and sort products
const filteredProducts = useMemo(() => {
  let result = [...products];

  // Search
  if (searchTerm.trim()) {
    result = result.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Category filter
  if (selectedCategory !== "all") {
    result = result.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Brand filter
  if (selectedBrand !== "all") {
    result = result.filter(
      (product) => product.brand === selectedBrand
    );
  }

  // Minimum price filter
  if (minPrice !== "") {
    result = result.filter(
      (product) => product.price >= Number(minPrice)
    );
  }

  // Maximum price filter
  if (maxPrice !== "") {
    result = result.filter(
      (product) => product.price <= Number(maxPrice)
    );
  }

  // Minimum rating filter
  if (minRating !== "all") {
    result = result.filter(
      (product) => product.rating >= Number(minRating)
    );
  }

  // In-stock filter
  if (inStockOnly) {
    result = result.filter((product) => product.stock > 0);
  }

  // Sorting
  if (sortOrder === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}, [
  products,
  searchTerm,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  minRating,
  inStockOnly,
  sortOrder,
]);


  // Calculate pagination
  const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Handle favorites
  function handleFavorite(product) {
    const updatedFavorites = toggleFavorite(product);
    setFavorites(updatedFavorites);
  }

  // Loading state
  if (loading) {
    return (
      <main className="shop-page">
        <p className="shop-message">Loading products...</p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="shop-page">
        <p className="shop-message">{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="shop-page">
      <section className="shop-heading">
        <span className="eyebrow">THE DRESSIFY COLLECTION</span>
        <h1>Shop All Products</h1>
        <p>Discover pieces that complement your personal style.</p>
      </section>

      <section className="products-section">
        <div className="shop-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
onChange={(e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1);
}}            />
          </div>

          <div className="filter-control">
            <SlidersHorizontal size={17} />
            <select
              value={selectedCategory}
onChange={(e) => {
  setSelectedCategory(e.target.value);
  setCurrentPage(1);
}}            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category.replace("womens-", "").replace("-", " ")}
                </option>
              ))}
            </select>
          </div>

          <select
            className="sort-select"
            value={sortOrder}
onChange={(e) => {
  setSortOrder(e.target.value);
  setCurrentPage(1);
}}          >
            <option value="default">Default Sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
         

<div className="advanced-filters">
  <div className="advanced-filters-heading">
    <h3>Advanced Filters</h3>

    <button
      type="button"
      onClick={() => {
        setSelectedBrand("all");
        setMinPrice("");
        setMaxPrice("");
        setMinRating("all");
        setInStockOnly(false);
        setCurrentPage(1);
      }}
    >
      Clear All Filters
    </button>
  </div>

  <div className="advanced-filters-grid">
    <div className="advanced-filter-group">
      <label htmlFor="brand-filter">Brand</label>
      <select
        id="brand-filter"
        value={selectedBrand}
        onChange={(e) => {
          setSelectedBrand(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">All Brands</option>
        {brands.map((brand) => (
          <option value={brand} key={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>

    <div className="advanced-filter-group">
      <label htmlFor="min-price">Minimum Price ($)</label>
      <input
        id="min-price"
        type="number"
        min="0"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>

    <div className="advanced-filter-group">
      <label htmlFor="max-price">Maximum Price ($)</label>
      <input
        id="max-price"
        type="number"
        min="0"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>

    <div className="advanced-filter-group">
      <label htmlFor="rating-filter">Minimum Rating</label>
      <select
        id="rating-filter"
        value={minRating}
        onChange={(e) => {
          setMinRating(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">All Ratings</option>
        <option value="4">4 Stars and Above</option>
        <option value="3">3 Stars and Above</option>
        <option value="2">2 Stars and Above</option>
      </select>
    </div>

    <div className="advanced-filter-group stock-filter">
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {
            setInStockOnly(e.target.checked);
            setCurrentPage(1);
          }}
        />
        In-stock products only
      </label>
    </div>
  </div>
</div>

        <div className="products-toolbar">
          <p>{filteredProducts.length} Products Found</p>
          <p>{favorites.length} Favorites Saved</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="shop-message">
            <h3>No products found</h3>
            <p>Try another search term or category.</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {currentProducts.map((product) => {
                const isFavorite = favorites.some(
                  (item) => item.id === product.id
                );

                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrapper">
                      <Link
                        to={`/product/${product.id}`}
                        className="product-image-link"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                        />
                      </Link>

                      <button
                        className="product-favorite-button"
                        aria-label={
                          isFavorite
                            ? `Remove ${product.title} from favorites`
                            : `Add ${product.title} to favorites`
                        }
                        aria-pressed={isFavorite}
                        type="button"
                        onClick={() => handleFavorite(product)}
                      >
                        <Heart
                          size={19}
                          fill={isFavorite ? "#a17b54" : "none"}
                          color={isFavorite ? "#a17b54" : "currentColor"}
                        />
                      </button>
                    </div>

                    <div className="product-info">
                      <h3>
                        <Link
                          to={`/product/${product.id}`}
                          className="product-title-link"
                        >
                          {product.title}
                        </Link>
                      </h3>

                      <p>
                        {product.category
                          .replace("womens-", "")
                          .replace("-", " ")}
                      </p>

                      <strong>${product.price.toFixed(2)}</strong>
                    </div>
                  </article>
                );
              })}

{totalPages > 1 && (
  <div className="pagination">
    <button
      type="button"
      className="pagination-button"
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((page) => page - 1)
      }
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        type="button"
        key={index + 1}
        className={`pagination-button ${
          currentPage === index + 1 ? "active" : ""
        }`}
        aria-current={
          currentPage === index + 1 ? "page" : undefined
        }
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

    <button
      type="button"
      className="pagination-button"
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((page) => page + 1)
      }
    >
      Next
    </button>
  </div>
)}

            </div>

            {/* Pagination controls will be added in the next step */}
          </>
        )}
      </section>
    </main>
  );
}
