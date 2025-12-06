import { useState, useEffect } from 'react';

export default function Events() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Student Loan",
      subtitle: "Guest visit by Guest name",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Market Trends",
      subtitle: "Expert analysis by John Doe",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Crypto Future",
      subtitle: "Workshop with Jane Smith",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const exclusiveEvents = [
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1554224155-9ffd48f43635?q=80&w=2070&auto=format&fit=crop" }
  ];

  const financeEvents = [
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1475721027767-f4240295bd43?q=80&w=2070&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1515168816144-b35639401023?q=80&w=2067&auto=format&fit=crop" },
    { title: "Eget risus bibendum", desc: "Eget risus bibendum ac nam quam quam sollicitudin velit.", image: "https://images.unsplash.com/photo-1556761175-4b46a8911a31?q=80&w=2068&auto=format&fit=crop" }
  ];

  const EventCard = ({ event }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 mb-4 rounded-xl overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600">{event.desc}</p>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Hero Carousel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="flex gap-2 mb-8">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${currentSlide === idx ? "w-8 h-2 bg-[#C0003D]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#C0003D] mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-[#C0003D] mb-8">
              {heroSlides[currentSlide].subtitle}
            </p>
            <button className="bg-[#C0003D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a00033] transition-colors">
              Explore Events
            </button>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Exclusive Session */}
      <section className="bg-[#FFF9F0] py-16 mb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-[#C0003D] mb-2">Exclusive session</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. Nec sollicitudin feugiat sed vel sit. Rhoncus nec in sollicitudin feugiat sed turpis ut arcu non risus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exclusiveEvents.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Finance Section */}
      <section className="bg-[#FFF9F0] py-16 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-[#C0003D] mb-2">Finance</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. Nec sollicitudin feugiat sed vel sit. Rhoncus nec in sollicitudin feugiat sed turpis ut arcu non risus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeEvents.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}