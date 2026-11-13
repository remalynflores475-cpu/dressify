
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <ShoppingBag size={48} strokeWidth={1.2} />
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Your bag is empty.</h1>
          <p>Discover something beautiful in our collection.</p>
          <Link to="/shop" className="primary-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} different product(s) in your bag</p>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>

                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="cart-clear-button"
              onClick={clearCart}
            >
              Clear Shopping Cart
            </button>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="cart-summary-row cart-total">
              <strong>Total</strong>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <p className="cart-summary-note">
              Shipping charges will be shown during demo checkout.
            </p>

            <Link to="/shop" className="secondary-button cart-continue">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
