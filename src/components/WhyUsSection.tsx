import React from 'react';
import { Truck, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden" id="why-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Organic Shape with Official Great Junk Removalist Truck */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              
              {/* Vibrant Lime Green Organic Blob Background */}
              <div
                className="absolute inset-0 bg-[#84d800] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] transform -rotate-3 scale-95 opacity-90 transition-transform duration-700 hover:rotate-0"
              />

              {/* Card Inside Shape Featuring Official Truck */}
              <div className="relative z-10 w-[90%] h-[90%] rounded-[36%_60%_68%_32%/38%_48%_58%_48%] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#091b2f] to-[#040e19] flex flex-col items-center justify-center p-6 text-center group">
                
                {/* Truck Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#84d800]/20 border border-[#84d800]/40 rounded-full text-[#84d800] text-[11px] font-extrabold uppercase tracking-wide mb-2">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Purpose-Built Isuzu Fleet</span>
                </div>

                {/* Official Truck Cutout */}
                <img
                  src="/images/logo.png"
                  alt="Great Junk Removalist Custom Truck"
                  className="w-full max-w-[340px] h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transform group-hover:scale-108 transition-transform duration-500"
                />

                {/* Micro Specs Pill */}
                <div className="mt-3 flex items-center justify-center gap-3 text-white/90 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84d800]" />
                    14m³ Volume
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84d800]" />
                    2-Tonne Payload
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84d800]" />
                    Laneway Friendly
                  </span>
                </div>
              </div>

              {/* Decorative small green satellite dots */}
              <div className="absolute -top-3 right-8 w-3 h-3 bg-[#84d800] rounded-full shadow" />
              <div className="absolute bottom-6 -left-2 w-4 h-4 bg-[#84d800] rounded-full shadow" />
              <div className="absolute top-1/2 -right-4 w-2.5 h-2.5 bg-[#84d800] rounded-full shadow" />
            </div>
          </div>

          {/* Right Column: Copy & Bullet Points */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#091b2f] tracking-tight leading-tight">
              Same Day{' '}
              <span className="text-[#6bb500]">
                Rubbish &amp; Junk Removal
              </span>{' '}
              Service in Melbourne
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Say goodbye to junk the easy way. Whether it's old furniture, garden waste, or renovation debris, our purpose-built Great Junk Removalist truck fleet handles the heavy lifting so you don't have to. Quick, affordable, and eco-conscious—our team makes junk disappear while you relax.
            </p>

            {/* Benefit List with Truck & Labour Benefits */}
            <div className="space-y-4 pt-2">
              <div className="text-sm sm:text-base leading-snug">
                <span className="font-extrabold text-[#091b2f]">Save Money</span>
                <span className="text-slate-600"> – Lowest rates in Melbourne, no surprise costs or hidden dump tipping fees.</span>
              </div>

              <div className="text-sm sm:text-base leading-snug">
                <span className="font-extrabold text-[#091b2f]">Save Time &amp; Effort</span>
                <span className="text-slate-600"> – Same-day dispatch with 2 uniformed removalists who do all the loading and sweeping.</span>
              </div>

              <div className="text-sm sm:text-base leading-snug">
                <span className="font-extrabold text-[#091b2f]">Custom Truck Fleet</span>
                <span className="text-slate-600"> – Built with low cab clearance to navigate narrow Melbourne driveways, car parks and laneways.</span>
              </div>

              <div className="text-sm sm:text-base leading-snug">
                <span className="font-extrabold text-[#091b2f]">Save the Planet</span>
                <span className="text-slate-600"> – On-truck sorting ensures metals, timber, e-waste, and donations bypass landfills.</span>
              </div>
            </div>

            {/* Melbourne Guarantee Note */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-500 border-t border-slate-100">
              <Shield className="w-4 h-4 text-[#6bb500] shrink-0" />
              <span>Fully licensed, insured ($20M public liability), and environmentally certified across Greater Melbourne.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
