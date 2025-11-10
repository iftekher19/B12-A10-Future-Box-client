import { useEffect, useState } from "react";
import axios from "../../axios.config";

import AOS from "aos";
import "aos/dist/aos.css";

// Sections
import HeroSection from "./HeroSection";
import FeaturedFoods from "./FeaturedFoods";
import HowItWorks from "./HowItWorks";
import OurMission from "./OurMission";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get("/foods");
        const getNum = (qty) => parseInt(qty.replace(/\D/g, "")) || 0;
        const sorted = data.sort(
          (a, b) => getNum(b.food_quantity) - getNum(a.food_quantity)
        );
        setFoods(sorted.slice(0, 6));
      } catch {
        toast.error("Failed to load featured foods");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="space-y-20">
      <toast position="top-center" />

      <HeroSection />

      <section className="max-w-7xl mx-auto px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Foods</h2>
        {loading ? (
          <div className="flex justify-center my-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <FeaturedFoods key={food._id} food={food} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <a href="/available-foods" className="btn btn-outline btn-primary">
            Show All
          </a>
        </div>
      </section>

      <HowItWorks />
      <OurMission />
    </div>
  );
}
