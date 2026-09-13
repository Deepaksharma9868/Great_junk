import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TrustRibbon } from '../components/TrustRibbon';
import { CtaBanner } from '../components/CtaBanner';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: "What types of junk do you remove?",
    answer: "We take almost everything! This includes old furniture, mattresses, appliances, white goods, green waste, renovation debris, e-waste, office equipment, and general household rubbish. We cannot take hazardous materials like asbestos, chemicals, or wet paint."
  },
  {
    question: "Do you offer same-day service?",
    answer: "Yes! We offer same-day and next-day rubbish removal services across Melbourne. It's best to call us early in the day to secure a spot, but we'll always do our best to accommodate urgent requests."
  },
  {
    question: "How do you charge for rubbish removal?",
    answer: "We charge based on volume (cubic metres) - you only pay for the exact space your junk takes up in our truck. Our pricing includes two strong team members, all heavy lifting, loading, and disposal fees. No hidden costs or surprise dump fees."
  },
  {
    question: "Do I need to put the rubbish on the nature strip?",
    answer: "Not at all. We provide a full hands-off service. Whether your junk is in the backyard, upstairs, in the garage, or under the house, our team will go in and get it. We even sweep up the area afterwards."
  },
  {
    question: "What happens to the junk once you take it?",
    answer: "We are committed to eco-friendly disposal. We sort the load in our trucks to ensure recyclable materials (metals, e-waste, timber) go to recycling centres, and items in good condition are donated. Only what truly can't be salvaged goes to landfill."
  }
];

interface FaqProps {
  onOpenCall: () => void;
}

export const Faq: React.FC<FaqProps> = ({ onOpenCall }) => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <div className="bg-[#f8fafc] py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#091b2f] tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to know about our Melbourne junk removal services.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-xl overflow-hidden transition-all ${
                  isOpen ? 'border-[#84d800] shadow-md' : 'border-slate-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#84d800] transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TrustRibbon />
      
      <CtaBanner
        onQuoteClick={() => navigate('/quote')}
        onCallClick={onOpenCall}
      />
    </>
  );
};
