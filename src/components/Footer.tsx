import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-8 md:py-10" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Left: Brand Logo */}
          <div>
            <Logo size="sm" />
          </div>

          {/* Center: Geographic Service Area */}
          <div>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Melbourne &amp; surrounding areas
            </p>
          </div>

          {/* Right: Guarantee Pillars */}
          <div>
            <p className="text-[#6bb500] font-bold text-xs sm:text-sm tracking-wide">
              Fast · Reliable · Eco-friendly
            </p>
          </div>

        </div>

        {/* SEO Suburbs & Local Melbourne Trust Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            Serving Inner Melbourne, Eastern Suburbs, Northern Suburbs, Western Suburbs &amp; Bayside.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Great Junk Removalist Melbourne. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
