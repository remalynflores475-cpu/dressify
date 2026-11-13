
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "Everyday Elegance",
    subtitle: "Effortless pieces for every day",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900",
  },
  {
    title: "Modern Essentials",
    subtitle: "The art of timeless dressing",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900",
  },
  {
    title: "Statement Style",
    subtitle: "Make every moment memorable",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000"
          alt="Women's fashion editorial"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="eyebrow">THE NEW SEASON COLLECTION</span>
          <h1>
            Style that speaks.
            <br />
            Elegance that lasts.
          </h1>
          <p>
            Discover thoughtfully selected pieces that
            celebrate your individual style.
          </p>

          <Link to="/shop" className="primary-button">
            Explore Collection <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="hero-bottom-label">
          DRESSIFY — YOUR STYLE, YOUR STORY
        </div>
      </section>

      <section className="intro-section">
        <span className="eyebrow">A NEW WAY TO DRESS</span>
        <h2>
          Less, but better.
          <br />
          Always in style.
        </h2>
        <p>
          We believe great style is not about having more.
          It is about finding pieces that make you feel confident,
          comfortable, and effortlessly beautiful.
        </p>
        <Link to="/shop" className="text-link">
          Discover our collection <ArrowRight size={17} />
        </Link>
      </section>

      <section className="collections-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Explore our collections</h2>
          </div>

          <Link to="/shop" className="text-link">
            View all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((collection, index) => (
            <Link
              to="/shop"
              className="collection-card"
              key={collection.title}
            >
              <div className="collection-image-wrapper">
                <img
                  src={collection.image}
                  alt={collection.title}
                  loading="lazy"
                />
                <span className="collection-number">
                  0{index + 1}
                </span>
                <span className="collection-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="collection-info">
                <div>
                  <h3>{collection.title}</h3>
                  <p>{collection.subtitle}</p>
                </div>
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <span className="eyebrow">STAY IN THE KNOW</span>
        <h2>A little inspiration, delivered.</h2>
        <p>
          Discover new arrivals, style inspiration, and
          the latest from Dressify.
        </p>
        <Link to="/shop" className="primary-button">
          Shop Now <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
