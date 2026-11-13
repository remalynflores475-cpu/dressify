
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Heart } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <div className="products-toolbar">
          <p>{products.length} Products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />

                <button
                  className="product-favorite-button"
                  aria-label={`Add ${product.title} to favorites`}
                >
                  <Heart size={19} />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.category}</p>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
