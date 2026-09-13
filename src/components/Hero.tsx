import React from 'react';
import bannerImage from '../assets/images/banner.png';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  return (
    <section className="relative w-full bg-[#032b4c] overflow-hidden" id="hero-section">
      {/* 1440x640 Hero Banner Container */}
      <div className="relative w-full max-w-[1440px] mx-auto">
        <div className="relative w-full aspect-[1440/640] min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[560px] xl:min-h-[640px]">
          {/* Official Uploaded Great Junk Removalist Banner Image */}
          <img
            src={bannerImage}
            alt="Great Junk Removalist Melbourne - We remove. You Relax."
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Invisible interactive hotspot directly mapped to the banner's native CTA button graphic */}
          <button
            onClick={onQuoteClick}
            className="absolute left-[4%] top-[77%] w-[28%] h-[15%] cursor-pointer opacity-0 rounded-xl focus:outline-hidden"
            aria-label="Get a Free Quote"
            id="hero-banner-hotspot-btn"
          />
        </div>
      </div>
    </section>
  );
};
