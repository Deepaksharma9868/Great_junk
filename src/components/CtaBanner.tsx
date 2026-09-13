import React from 'react';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onQuoteClick: () => void;
  onCallClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onQuoteClick, onCallClick }) => {
  return (
    <section className="w-full bg-[#07192d] overflow-hidden py-10 lg:py-0 border-t border-slate-800" id="bottom-cta-banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[340px] lg:min-h-[380px] gap-8">
          
          {/* Left: Official Great Junk Removalist Truck Graphic with Glow & Badges */}
          <div className="w-full lg:w-[48%] flex flex-col items-center justify-center relative py-6">
            <div className="absolute inset-0 bg-[#84d800]/10 blur-3xl rounded-full pointer-events-none" />
            <img
              src="/images/logo.png"
              alt="Great Junk Removalist Melbourne Truck"
              className="relative z-10 w-full max-w-[440px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300"
            />
            <div className="relative z-10 mt-3 flex items-center gap-3 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1 text-[#84d800]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Two-person team included
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#84d800]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                We load & sweep up
              </span>
            </div>
          </div>

          {/* Right: Content and Action Buttons */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center text-center lg:text-left z-10 py-6">
            
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="text-[#84d800] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                READY TO CLEAR THE JUNK?
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-3">
              Get Your Free Quote Today
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Tell us what needs to go and our Melbourne team will dispatch our custom-equipped truck to take care of everything. Fast, polite, and affordable.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Primary Green CTA Button */}
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#84d800] hover:bg-[#76c700] active:scale-[0.98] text-[#091b2f] font-extrabold text-base rounded-xl shadow-lg hover:shadow-[#84d800]/25 transition-all duration-200 cursor-pointer group"
                id="cta-get-quote-btn"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Call Us Button */}
              <button
                onClick={onCallClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                id="cta-call-us-btn"
              >
                <Phone className="w-4 h-4 text-[#84d800]" />
                <span>Call Us</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
