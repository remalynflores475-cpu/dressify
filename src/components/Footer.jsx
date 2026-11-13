
import { Link } from "react-router-dom";
import { Camera, Users, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand">
            DRESSIFY<span>.</span>
          </Link>

          <p>
            Timeless style. Thoughtful choices.
            Discover fashion that feels like you.
          </p>

          <div className="social-links">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Camera size={19} />
            </a>

            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <Users size={19} />
            </a>

            <a href="mailto:hello@dressify.example" aria-label="Email">
              <Mail size={19} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop Collection</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="footer-column">
          <h4>Customer Care</h4>
          <a href="mailto:support@dressify.example">Contact Us</a>
          <a href="mailto:support@dressify.example">Help Center</a>
          <a href="mailto:support@dressify.example">
            Shipping Information
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Dressify. All rights reserved.</p>
        <p>Designed for everyday elegance.</p>
      </div>
    </footer>
  );
}
