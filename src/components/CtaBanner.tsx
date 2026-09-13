import React from 'react';
import banner2Image from '../assets/images/banner_2.png';

interface CtaBannerProps {
  onQuoteClick: () => void;
  onCallClick?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onQuoteClick }) => {
  return (
    <section className="relative w-full bg-[#07192d] overflow-hidden border-t border-slate-800" id="bottom-cta-banner">
      <div className="relative w-full max-w-[1476px] mx-auto">
        <div className="relative w-full">
          <img
            src={banner2Image}
            alt="Ready to clear the junk? Get your quote today."
            className="w-full h-auto block select-none"
            loading="lazy"
          />

          {/* Interactive hotspot covering the banner so users can click it to get a quote */}
          <button
            onClick={onQuoteClick}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0 focus:outline-hidden"
            aria-label="Get a Quote"
            id="cta-banner-hotspot-btn"
          />
        </div>
      </div>
    </section>
  );
};
