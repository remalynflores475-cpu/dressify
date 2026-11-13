
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import {
  getFavorites,
  toggleFavorite,
} from "../services/favoriteService";

export default function Favorites() {
 const [favorites, setFavorites] = useState(() => getFavorites());

  function handleRemove(product) {
    const updatedFavorites = toggleFavorite(product);
    setFavorites(updatedFavorites);
  }

  return (
    <main className="favorites-page">
      <section className="favorites-heading">
        <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>My Favorites</h1>
        <p>Your saved pieces, all in one place.</p>
      </section>

      <section className="favorites-content">
        <div className="favorites-toolbar">
          <p>{favorites.length} Saved Products</p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <Heart size={42} strokeWidth={1.2} />
            <h2>Your favorites list is empty</h2>
            <p>Save the pieces you love and find them here anytime.</p>
            <Link to="/shop" className="primary-button">
              <ShoppingBag size={17} />
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {favorites.map((product) => (
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
                    type="button"
                    aria-label={`Remove ${product.title} from favorites`}
                    onClick={() => handleRemove(product)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="product-info">
<h3>
  <Link to={`/product/${product.id}`} className="product-title-link">
    {product.title}
  </Link>
</h3>                  <p>
                    {product.category
                      .replace("womens-", "")
                      .replace("-", " ")}
                  </p>
                  <strong>${product.price.toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
