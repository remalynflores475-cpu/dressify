
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";
import {
  getFavorites,
  toggleFavorite,
} from "../services/favoriteService";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

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

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  function handleFavorite(product) {
    const updatedFavorites = toggleFavorite(product);
    setFavorites(updatedFavorites);
  }

  if (loading) {
    return (
      <main className="shop-page">
        <p className="shop-message">Loading products...</p>
      </main>
    );
  }

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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-control">
            <SlidersHorizontal size={17} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
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
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
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
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.some(
                (item) => item.id === product.id
              );

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrapper">
                   <Link to={`/product/${product.id}`} className="product-image-link">
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
                  <Link to={`/product/${product.id}`} className="product-title-link">
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
          </div>
        )}
      </section>
    </main>
  );
}
