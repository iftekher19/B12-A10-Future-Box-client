import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section
      className="hero min-h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-50"></div>

      <div
        className="text-center text-neutral-content px-6 z-10"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow">
          Share Food, Share Happiness 🍽
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
          Join the PlateShare community — donate or request home-cooked meals
          and help reduce waste while feeding smiles!
        </p>
        <Link to="/available-foods" className="btn btn-primary">
          View All Foods
        </Link>
      </div>
    </section>
  );
}
