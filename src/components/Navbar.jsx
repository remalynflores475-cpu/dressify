
import { Link, NavLink } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <div className="announcement-bar">
        Complimentary shipping on orders over $100
      </div>

      <header className="navbar">
        <Link to="/" className="brand">
          DRESSIFY<span>.</span>
        </Link>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>

          <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>
            Favorites
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button aria-label="Search" className="icon-button">
            <Search size={20} />
          </button>

          <Link
            to="/favorites"
            aria-label="Favorites"
            className="icon-button"
          >
            <Heart size={20} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="icon-button cart-nav-link"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          <button
            aria-label="Toggle navigation"
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
    </>
  );
}
