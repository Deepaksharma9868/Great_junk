import React from 'react';
import { QuoteSection } from '../components/QuoteSection';
import { TrustRibbon } from '../components/TrustRibbon';

interface GetQuoteProps {
  selectedService: string;
  setSelectedService: (svc: string) => void;
}

export const GetQuote: React.FC<GetQuoteProps> = ({ selectedService, setSelectedService }) => {
  return (
    <>
      <div className="bg-[#091b2f] pt-12 pb-24 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Get Your Quote
          </h1>
          <p className="text-lg text-slate-300">
            Tell us about your junk removal needs and our Melbourne team will get back to you with a transparent, no-obligation estimate.
          </p>
        </div>
      </div>
      
      <div className="-mt-16">
        <QuoteSection
          selectedService={selectedService}
          onServiceSelect={(svc) => setSelectedService(svc)}
        />
      </div>

      <div className="pt-16">
        <TrustRibbon />
      </div>
    </>
  );
};
