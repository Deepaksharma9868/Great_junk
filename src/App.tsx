import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';

import { Home } from './pages/Home';
import { WhyGjr } from './pages/WhyGjr';
import { Faq } from './pages/Faq';
import { GetQuote } from './pages/GetQuote';

export default function App() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-[#84d800] selection:text-[#091b2f]">
        {/* Top Navigation */}
        <Navbar onOpenCall={() => setIsCallModalOpen(true)} />

        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenCall={() => setIsCallModalOpen(true)}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                />
              } 
            />
            <Route 
              path="/why-gjr" 
              element={<WhyGjr onOpenCall={() => setIsCallModalOpen(true)} />} 
            />
            <Route 
              path="/faq" 
              element={<Faq onOpenCall={() => setIsCallModalOpen(true)} />} 
            />
            <Route 
              path="/quote" 
              element={
                <GetQuote 
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                />
              } 
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Call Dialog Modal */}
        <CallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
