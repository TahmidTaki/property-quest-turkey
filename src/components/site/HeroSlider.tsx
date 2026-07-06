"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/primitives";
import { company } from "@/lib/site";

const slides = [
  {
    id: 1,
    title: (
      <>
        Own property in Istanbul.{" "}
        <span className="text-gold">Secure Turkish citizenship.</span>
      </>
    ),
    subtitle: "Istanbul · Citizenship by Investment",
    description: `${company.name} guides international investors through every step — from first viewing to title deed, residency, and a passport for the whole family.`,
    stats: [
      ["$400K", "Min. investment for citizenship"],
      ["3–6 mo", "Typical citizenship timeline"],
      ["500+", "Families relocated"],
      ["100%", "End-to-end legal support"],
    ],
    image: "/images/hero-istanbul.jpg",
  },
  {
    id: 2,
    title: (
      <>
        The True Cost of{" "}
        <span className="text-gold">Property Investment in Turkey</span>
      </>
    ),
    subtitle: "Know Before You Invest",
    description: "Understand the real costs, taxes, and returns before you invest. Our transparent breakdown helps you make informed decisions with confidence.",
    stats: [
      ["4-6%", "Average rental yield"],
      ["~5%", "Purchase taxes & fees"],
      ["3 yrs", "Minimum hold period"],
      ["100%", "Legal transparency"],
    ],
    image: "/images/hero-cost.jpg",
  },
  {
    id: 3,
    title: (
      <>
        Expert Guidance{" "} <br></br>
        <span className="text-gold">at Every Step</span>
      </>
    ),
    subtitle: "Your Journey, Our Expertise",
    description: "From property selection to legal documentation, our team ensures a seamless experience. We handle the complexities so you can focus on your investment goals.",
    stats: [
      ["10+", "Years of experience"],
      ["500+", "Happy investors"],
      ["24/7", "Client support"],
      ["100%", "Success rate"],
    ],
    image: "/images/hero-guidance.jpg",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden px-5 py-16 text-white sm:px-8 sm:py-28 min-h-[550px] sm:min-h-[650px] flex items-center">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.subtitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-ink/90" />
          </div>
        ))}
      </div>

      <div className="container-x relative w-full">
        <div className="min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
          <p className="mb-3 sm:mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all duration-500 h-4 sm:h-5">
            {slide.subtitle}
          </p>

          <h1 className="max-w-3xl text-2xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-500 min-h-[56px] sm:min-h-[60px] lg:min-h-[80px]">
            {slide.title}
          </h1>

          <p className="mt-3 sm:mt-5 max-w-xl text-base sm:text-lg text-white/85 transition-all duration-500 min-h-[40px] sm:min-h-[28px] line-clamp-3 sm:line-clamp-none">
            {slide.description}
          </p>

          {/* Buttons restored to original size */}
          <div className="mt-5 sm:mt-8 flex flex-wrap gap-3">
            <LinkButton href="/projects" variant="gold">
              Browse projects <ArrowRight size={16} />
            </LinkButton>
            <LinkButton
              href="/contact"
              variant="outline"
              className="!border-white !text-white hover:!bg-white hover:!text-navy"
            >
              Book a free consultation
            </LinkButton>
          </div>

          <dl className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl sm:grid-cols-4 min-h-[60px] sm:min-h-[80px]">
            {slide.stats.map(([stat, label]) => (
              <div key={label}>
                <dt className="tabular text-xl sm:text-2xl font-extrabold text-gold">
                  {stat}
                </dt>
                <dd className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white/70 leading-tight">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Slide Dots */}
        <div className="mt-6 sm:mt-10 flex justify-center gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-6 sm:w-8 bg-gold h-2 sm:h-2.5"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}