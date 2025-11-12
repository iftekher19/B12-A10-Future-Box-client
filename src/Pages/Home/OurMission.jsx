export default function OurMission() {
  return (
    <section
      className="py-16 bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-100"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          TableTogether believes in a world where no one goes hungry and no meal
          goes to waste. By building a community around food sharing, we reduce
          waste and spread kindness — one plate at a time.
        </p>

        <div className="stats shadow flex flex-col sm:flex-row justify-center border-t border-base-200">
          <div className="stat py-4 sm:py-0">
            <div className="stat-title">Meals Shared</div>
            <div className="stat-value text-primary">1,250+</div>
          </div>
          <div className="stat py-4 sm:py-0">
            <div className="stat-title">Active Donators</div>
            <div className="stat-value text-primary">420+</div>
          </div>
          <div className="stat py-4 sm:py-0">
            <div className="stat-title">Communities Helped</div>
            <div className="stat-value text-primary">35+</div>
          </div>
        </div>
      </div>
    </section>
  );
}
