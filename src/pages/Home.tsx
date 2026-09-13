import React from 'react';
import { Hero } from '../components/Hero';
import { TrustRibbon } from '../components/TrustRibbon';
import { QuoteSection } from '../components/QuoteSection';
import { WorkShowcase } from '../components/WorkShowcase';
import { CustomerStories } from '../components/CustomerStories';
import { ServicesSection } from '../components/ServicesSection';
import { WhyUsSection } from '../components/WhyUsSection';
import { CtaBanner } from '../components/CtaBanner';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  onOpenCall: () => void;
  selectedService: string;
  setSelectedService: (svc: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenCall, selectedService, setSelectedService }) => {
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate('/quote');
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    navigate('/quote');
  };

  return (
    <>
      <Hero onQuoteClick={handleQuoteClick} />
      <TrustRibbon />
      <QuoteSection
        selectedService={selectedService}
        onServiceSelect={(svc) => setSelectedService(svc)}
      />
      <WorkShowcase />
      <CustomerStories />
      <ServicesSection onSelectService={handleSelectService} />
      <WhyUsSection />
      <CtaBanner
        onQuoteClick={handleQuoteClick}
        onCallClick={onOpenCall}
      />
    </>
  );
};
