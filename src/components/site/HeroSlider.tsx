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
        Expert Guidance{" "}
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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-28 min-h-[600px] flex items-center">
      {/* Background Images with Crossfade - FIXED HEIGHT */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image with object-fit cover */}
            <img
              src={s.image}
              alt={s.subtitle}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-ink/90" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full bg-gold/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red/10" />

      <div className="container-x relative w-full">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all duration-500">
          {slide.subtitle}
        </p>

        <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl transition-all duration-500">
          {slide.title}
        </h1>

        <p className="mt-5 max-w-xl text-lg text-white/85 transition-all duration-500">
          {slide.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
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

        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {slide.stats.map(([stat, label]) => (
            <div key={label}>
              <dt className="tabular text-2xl font-extrabold text-gold">
                {stat}
              </dt>
              <dd className="mt-1 text-xs text-white/70">{label}</dd>
            </div>
          ))}
        </dl>

        {/* Slide Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 bg-gold h-2.5"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}