import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustRibbon } from './components/TrustRibbon';
import { QuoteSection } from './components/QuoteSection';
import { WorkShowcase } from './components/WorkShowcase';
import { CustomerStories } from './components/CustomerStories';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';

export default function App() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote-section');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToQuote();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-[#84d800] selection:text-[#091b2f]">
      {/* Top Navigation */}
      <Navbar onOpenCall={() => setIsCallModalOpen(true)} />

      {/* Hero Section with Truck & Melbourne headline */}
      <Hero onQuoteClick={scrollToQuote} />

      {/* Trust Ribbon (Fast & reliable / Residential & commercial / Eco-friendly approach) */}
      <TrustRibbon />

      {/* "LET'S CLEAR YOUR SPACE" & "Get a Quote" Form with Photo Upload */}
      <QuoteSection
        selectedService={selectedService}
        onServiceSelect={(svc) => setSelectedService(svc)}
      />

      {/* Google Review Badge & Before/After Job Slider with Daily Uploads */}
      <WorkShowcase />

      {/* Real Stories from Satisfied Customers (Mirroring competitor site) */}
      <CustomerStories />

      {/* "OUR SERVICES" - 9 Service Cards Grid */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* Feature & Why Choose Us with Organic Blob Collage */}
      <WhyUsSection />

      {/* Bottom CTA Banner with Isuzu Truck */}
      <CtaBanner
        onQuoteClick={scrollToQuote}
        onCallClick={() => setIsCallModalOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Call Dialog Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </div>
  );
}
