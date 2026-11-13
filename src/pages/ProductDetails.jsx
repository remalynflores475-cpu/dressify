
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import {
  getFavorites,
  toggleFavorite,
} from "../services/favoriteService";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, retryCount]);

  function handleFavorite() {
    const updatedFavorites = toggleFavorite(product);
    setFavorites(updatedFavorites);
  }

  const isFavorite = favorites.some(
    (item) => item.id === product?.id
  );

  if (loading) {
    return (
      <main className="product-details-page">
        <p className="shop-message">Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="shop-message">
          <h2>Unable to load product</h2>
          <p>{error || "Product not found."}</p>
          <button onClick={() => setRetryCount((count) => count + 1)}>
            Try Again
          </button>
          <Link to="/shop" className="back-link">
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={17} />
          Back to Collection
        </Link>

        <section className="product-details-content">
          <div className="product-details-image">
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="product-details-info">
            <span className="eyebrow">DRESSIFY COLLECTION</span>

            <p className="product-details-category">
              {product.category.replace("womens-", "").replace("-", " ")}
            </p>

            <h1>{product.title}</h1>

            <div className="product-rating">
              <Star size={17} fill="#a17b54" color="#a17b54" />
              <span>{product.rating}</span>
              <span>({product.stock} in stock)</span>
            </div>

            <h2 className="product-details-price">
              ${product.price.toFixed(2)}
            </h2>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-details-actions">
  <button
    type="button"
    className="primary-button"
    onClick={handleFavorite}
  >
    <Heart
      size={18}
      fill={isFavorite ? "currentColor" : "none"}
    />
    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
  </button>

  <button
    type="button"
    className="secondary-button"
    onClick={() => addToCart(product)}
  >
    <ShoppingBag size={18} />
    Add to Cart
  </button>

  <Link to="/shop" className="secondary-button">
    Continue Shopping
  </Link>
</div>

            <div className="product-extra-info">
              <p><strong>Brand:</strong> {product.brand || "Dressify"}</p>
              <p><strong>Availability:</strong> {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
              <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
