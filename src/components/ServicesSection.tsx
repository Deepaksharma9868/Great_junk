import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceCard {
  id: string;
  title: string;
  image: string;
  description: string;
  buttonLabel: string;
  quoteServiceValue: string;
  tag?: string;
}

const ALL_SERVICES: ServiceCard[] = [
  {
    id: 'residential',
    title: 'Residential Rubbish Removal',
    image: '/images/services-original/residential.webp',
    description:
      'From Houses to Apartments – nothing is too much trouble. We remove your unwanted junk, rubbish, furniture & even fittings and carpet from where you tell us to.',
    buttonLabel: 'RESIDENTIAL',
    quoteServiceValue: 'Residential Rubbish Removal',
    tag: 'Popular',
  },
  {
    id: 'deceased-estate',
    title: 'Deceased Estate Clearance',
    image: '/images/services-original/estate.webp',
    description:
      'Compassionate, respectful estate clearance near you. We sort belongings for donation or disposal, handle everything with care, and leave the property ready for sale.',
    buttonLabel: 'DECEASED ESTATE',
    quoteServiceValue: 'Deceased Estate',
    tag: 'Compassionate',
  },
  {
    id: 'commercial',
    title: 'Commercial Rubbish Removal',
    image: '/images/services-original/commercial.webp',
    description:
      "Be it Offices, Warehouses or Retail – we have you covered. We'll remove anything, from obsolete stock, IT or furniture and cubicles or even whole strip outs.",
    buttonLabel: 'COMMERCIAL',
    quoteServiceValue: 'Commercial Rubbish Removal',
    tag: 'B2B & Office',
  },
  {
    id: 'construction',
    title: 'Construction Rubbish Removal',
    image: '/images/services-original/construction.webp',
    description:
      'Reliable and Fast, we clean out any building or demolition site of rubbish and waste or even strip out fixtures and carpet – for a safer, more productive work site.',
    buttonLabel: 'CONSTRUCTION',
    quoteServiceValue: 'Construction Rubbish Removal',
    tag: 'Builders & Renos',
  },
  {
    id: 'piano-removal',
    title: 'Piano Removal',
    image: '/images/services-original/piano.webp',
    description:
      'Bulky upright and grand pianos moved safely. Experienced team equipped with heavy-duty piano dollies, straps, and protective blankets to avoid floor or wall damage.',
    buttonLabel: 'PIANO REMOVAL',
    quoteServiceValue: 'Piano Removal',
    tag: 'Heavy & Bulky',
  },
  {
    id: 'green-waste',
    title: 'Green Waste Removal',
    image: '/images/services-original/greenwaste.webp',
    description:
      'Branches, fallen storm trees, yard trimmings, soil, and garden cleanups. We do all the raking and loading, and 100% of organic green waste is delivered to mulch recycling.',
    buttonLabel: 'GREEN WASTE',
    quoteServiceValue: 'Green Waste',
    tag: '100% Recycled',
  },
  {
    id: 'metal-removal',
    title: 'Metal & Scrap Removal',
    image: '/images/services-original/metal.webp',
    description:
      'Recycle heavy scrap metal, old corrugated roofing, steel posts, car panels, appliances, and plumbing copper. Fast collection from trade sites and homes.',
    buttonLabel: 'METAL REMOVAL',
    quoteServiceValue: 'Metal Removal',
    tag: 'Scrap & Steel',
  },
  {
    id: 'spa-removal',
    title: 'Spa & Hot Tub Removal',
    image: '/images/services-original/spa.webp',
    description:
      'Unwanted backyard spas, jacuzzis, and hot tubs dismantled on-site safely with specialized cutting equipment and hauled away with zero damage to your fences.',
    buttonLabel: 'SPA REMOVAL',
    quoteServiceValue: 'Spa Removal',
    tag: 'Specialist',
  },
  {
    id: 'cardboard-removal',
    title: 'Cardboard Removal',
    image: '/images/services-original/cardboard.webp',
    description:
      'Piles of delivery boxes, packaging materials, and pallets from warehouse orders or residential moves cleared out in one trip for eco-conscious recycling.',
    buttonLabel: 'CARDBOARD',
    quoteServiceValue: 'Cardboard Removal',
    tag: 'Eco Friendly',
  },
  {
    id: 'clean-ups',
    title: 'Clean Ups & Hoarder Support',
    image: '/images/services-original/cleanups.webp',
    description:
      'Our services include clean ups for the NDIS, deceased estates, hoarders, spring cleans through to tenants dumped rubbish. We are here to get things cleaned up for you.',
    buttonLabel: 'CLEAN UPS',
    quoteServiceValue: 'Clean Ups',
    tag: 'NDIS Registered',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate active index for dots
      const cardWidth = 340;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveSlideIndex(Math.min(index, ALL_SERVICES.length - 1));
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      checkScroll();
      slider.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        slider.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth > 768 ? 360 * 2 : 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#84d800]/15 text-[#3d6c00] rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#559400]" />
              <span>All 10 Specialised Services</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091b2f] tracking-tight">
              Our Full Range of <span className="text-[#559400]">Services</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Slide horizontally through our full Melbourne rubbish removal catalog. From everyday furniture and appliances to heavy pianos, deceased estates, and industrial site cleanouts.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <div className="hidden sm:flex items-center text-xs font-bold text-slate-500 mr-2">
              <span>Slide to explore ({ALL_SERVICES.length} services)</span>
            </div>

            <button
              onClick={() => slide('left')}
              disabled={!canScrollLeft}
              aria-label="Slide previous services"
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-white text-[#091b2f] border-slate-300 hover:bg-[#84d800] hover:border-[#84d800] hover:text-[#091b2f] shadow-sm'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button
              onClick={() => slide('right')}
              disabled={!canScrollRight}
              aria-label="Slide next services"
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-[#091b2f] text-white border-[#091b2f] hover:bg-[#84d800] hover:border-[#84d800] hover:text-[#091b2f] shadow-sm'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Carousel Container with Side Floating Arrows & Horizontal Scroll */}
        <div className="relative group/carousel">
          
          {/* Floating Left Arrow (desktop overlay) */}
          {canScrollLeft && (
            <button
              onClick={() => slide('left')}
              aria-label="Slide left"
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-xs border border-slate-300 shadow-xl items-center justify-center text-[#091b2f] hover:bg-[#84d800] hover:border-[#84d800] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
          )}

          {/* Floating Right Arrow (desktop overlay) */}
          {canScrollRight && (
            <button
              onClick={() => slide('right')}
              aria-label="Slide right"
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#091b2f]/95 backdrop-blur-xs border border-[#091b2f] shadow-xl items-center justify-center text-white hover:bg-[#84d800] hover:border-[#84d800] hover:text-[#091b2f] transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          )}

          {/* Scrollable Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 scrollbar-none items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ALL_SERVICES.map((card) => (
              <div
                key={card.id}
                className="snap-start flex-none w-[285px] sm:w-[320px] md:w-[340px] bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(0,0,0,0.14),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between group"
                id={`service-card-${card.id}`}
              >
                {/* Card Top: Flush Photo */}
                <div className="w-full relative overflow-hidden bg-slate-100 aspect-[16/11]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    width={960}
                    height={660}
                  />
                  
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Category Pill Badge */}
                  {card.tag && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#091b2f]/85 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wide rounded-md">
                      {card.tag}
                    </div>
                  )}
                </div>

                {/* Card Body: Title, Description & Bottom Button */}
                <div className="p-6 sm:p-7 flex flex-col justify-between items-center text-center flex-1">
                  <div>
                    {/* Card Title */}
                    <h3 className="text-lg sm:text-xl font-black text-[#091b2f] group-hover:text-[#559400] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="mt-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Action Button (Exact Website Color Combination) */}
                  <div className="mt-6 pt-2 w-full flex justify-center">
                    <button
                      onClick={() => onSelectService(card.quoteServiceValue)}
                      className="w-full min-w-[150px] px-6 py-2.5 bg-[#84d800] hover:bg-[#76c700] active:scale-[0.98] text-[#091b2f] font-black text-xs uppercase tracking-wider rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                      id={`btn-${card.id}`}
                    >
                      <span>{card.buttonLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots & Fast Nav */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Paging Indicators */}
          <div className="flex items-center gap-2">
            {ALL_SERVICES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  if (sliderRef.current) {
                    const cardWidth = sliderRef.current.clientWidth > 768 ? 360 : 300;
                    sliderRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeSlideIndex === idx
                    ? 'w-8 bg-[#84d800]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              />
            ))}
          </div>

          {/* Prompt / Direct Quote link */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span>Don't see your specific item?</span>
            <button
              onClick={() => onSelectService('General Rubbish')}
              className="text-[#091b2f] font-bold underline hover:text-[#559400] transition cursor-pointer"
            >
              Get a custom instant estimate →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
