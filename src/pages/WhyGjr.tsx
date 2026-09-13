import React from 'react';
import { CustomerStories } from '../components/CustomerStories';
import { TrustRibbon } from '../components/TrustRibbon';
import { CtaBanner } from '../components/CtaBanner';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Leaf, Clock, ThumbsUp } from 'lucide-react';

interface WhyGjrProps {
  onOpenCall: () => void;
}

export const WhyGjr: React.FC<WhyGjrProps> = ({ onOpenCall }) => {
  const navigate = useNavigate();

  return (
    <>
      <div 
        className="relative text-white py-24 sm:py-32 bg-[#091b2f] flex flex-col items-center justify-center min-h-[400px]"
      >
        {/* Dark Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/lounge-junk-before.jpg)',
          }}
        />
        {/* Dark Gradient / Tint overlay to make text readable */}
        <div className="absolute inset-0 z-0 bg-[#091b2f]/80" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 drop-shadow-md">
            About Great Junk Removalist
          </h1>
          <p className="text-lg sm:text-2xl text-slate-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Melbourne's trusted clearance crew for homes, offices, and estates: we do the heavy lifting, sort for recycling, and leave you completely clutter-free.
          </p>
        </div>
      </div>

      <TrustRibbon />

      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-lg text-slate-600 mx-auto">
            <h2 className="text-3xl font-extrabold text-[#091b2f] mb-6">
              GJR's Story: Making Melbourne Cleaner, One Load at a Time
            </h2>
            <p className="mb-6">
              At <strong>Great Junk Removalist</strong>, we didn’t start with a massive fleet of trucks. We started with a simple observation: clearing out a space is often the hardest part of moving forward. Whether it’s reclaiming a spare bedroom, clearing a garden after a storm, or the sensitive task of managing a deceased estate, we saw that Melburnians needed more than just a hauling service—they needed a helping hand.
            </p>
            <p className="mb-12">
              We built this business on the principles of <strong>reliability, transparency, and hard work</strong>. When we say we’ll be there, we’re there. When we give a quote, we stick to it.
            </p>

            <h3 className="text-2xl font-extrabold text-[#091b2f] mb-6">
              What Makes Us Different?
            </h3>
            <p className="mb-6">
              We know you have choices when it comes to rubbish removal. Here is why our clients stay with us:
            </p>
            
            <ul className="space-y-6 mb-12 list-none pl-0">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#eaf8dd] text-[#74cb00] rounded-full mr-4 mt-1">
                  <ThumbsUp className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-[#091b2f] block text-xl mb-1">The Personal Touch</strong>
                  We aren't a faceless franchise. We are local operators who take pride in our community. We treat every home and backyard with the same respect we’d give our own.
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#eaf8dd] text-[#74cb00] rounded-full mr-4 mt-1">
                  <Leaf className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-[#091b2f] block text-xl mb-1">Eco-Conscious Disposal</strong>
                  "Junk" doesn't always mean "trash." We are committed to Melbourne’s environment. We sort through every load to ensure that green waste is composted, recyclables are processed, and usable items are donated whenever possible.
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#eaf8dd] text-[#74cb00] rounded-full mr-4 mt-1">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-[#091b2f] block text-xl mb-1">The "No-Stress" Guarantee</strong>
                  Our name is Great Junk Removalist for a reason. From the first phone call to the final sweep-up of your driveway, our goal is to make the clutter vanish without you lifting a finger.
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-extrabold text-[#091b2f] mb-6">
              More Than Just Rubbish
            </h3>
            <p className="mb-6">
              Whether we are helping a local business clear out an old office or assisting a family with a massive garden overhaul, we see the impact of our work immediately. A clear space leads to a clear mind, and we love being the team that helps you get there.
            </p>
            <p className="mb-6">
              Ready to clear the air?<br/>
              We’re ready when you are. Based right here in Melbourne, we’re just a call away from making your space feel like home again.
            </p>
          </div>

        </div>
      </div>
      
      <div className="py-10 bg-slate-50 border-t border-slate-200">
        <CustomerStories />
      </div>
      
      <CtaBanner
        onQuoteClick={() => navigate('/quote')}
        onCallClick={onOpenCall}
      />
    </>
  );
};
