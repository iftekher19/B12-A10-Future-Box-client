import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* background swiper */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        speed={1000}
        className="absolute inset-0 z-0 h-full"
      >
        {[
          "https://i.ibb.co.com/RpgcXzbw/main.jpg",
          "https://i.ibb.co.com/60w914jX/mngso.jpg",
          "https://i.ibb.co.com/My0k2pxh/fish.jpg",
          "https://i.ibb.co.com/C3P8G18r/cingri.jpg",
          "https://i.ibb.co.com/PsgPDdRZ/kichuri.jpg",
        ].map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} alt="" className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* centered text */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow">
          Share Food, Share Happiness
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
