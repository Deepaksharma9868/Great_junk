import React from 'react';
import { Check, Leaf } from 'lucide-react';

export const TrustRibbon: React.FC = () => {
  return (
    <section className="w-full bg-[#edf7e8] border-y border-[#dbeef0]/50 py-3.5" id="trust-ribbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-20 text-[#14341b] text-xs sm:text-sm font-semibold tracking-wide">
          
          <div className="flex items-center gap-1.5" id="trust-fast-reliable">
            <Check className="w-4 h-4 text-[#438a06] stroke-[3]" />
            <span>Fast &amp; reliable</span>
          </div>

          <div className="flex items-center gap-1.5" id="trust-residential-commercial">
            <Check className="w-4 h-4 text-[#438a06] stroke-[3]" />
            <span>Residential &amp; commercial</span>
          </div>

          <div className="flex items-center gap-1.5" id="trust-eco-friendly">
            <Leaf className="w-4 h-4 text-[#438a06] fill-[#438a06]/20" />
            <span>Eco-friendly approach</span>
          </div>

        </div>
      </div>
    </section>
  );
};
