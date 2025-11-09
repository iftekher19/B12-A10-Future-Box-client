export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-16" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="text-4xl mb-3">🍲</div>
            <h3 className="font-semibold text-lg mb-2">Post Food</h3>
            <p>
              Share surplus meals easily to reduce waste and support your
              community.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Find Food</h3>
            <p>Browse meals donated by community members around you.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg mb-2">Collect Food</h3>
            <p>
              Request a meal and pick it up directly from the donor’s location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
