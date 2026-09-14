import React, { useState, useEffect, useRef } from 'react';
import { Phone, X, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickCallButtonProps {
  onOpenCallModal?: () => void;
}

export const QuickCallButton: React.FC<QuickCallButtonProps> = ({ onOpenCallModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div 
      ref={containerRef} 
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
      id="quick-call-container"
    >
      {/* Popover Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 overflow-hidden"
            id="quick-call-options"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74cb00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#74cb00]"></span>
                </span>
                <span className="text-xs font-bold text-slate-700 tracking-wide">Quick Connect</span>
              </div>
              <div className="flex items-center text-[11px] text-slate-500 gap-1">
                <Clock className="w-3 h-3 text-[#559400]" />
                <span>7:30AM – 7:00PM</span>
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {/* Option 1: Call Us */}
              <a
                href="tel:0480557454"
                id="quick-option-call"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-[#eaf8dd]/60 border border-slate-200/70 hover:border-[#74cb00]/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#74cb00] flex items-center justify-center text-[#091b2f] shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 stroke-[2.3]" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#091b2f] flex items-center gap-1.5">
                      Call Us
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#eaf8dd] text-[#559400]">Direct</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">0480 557 454</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#74cb00] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Option 2: WhatsApp */}
              <a
                href="https://wa.me/61480557454?text=Hi%20Great%20Junk%20Removalist%2C%20I%20would%20like%20to%20get%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                id="quick-option-whatsapp"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-[#25D366]/10 border border-slate-200/70 hover:border-[#25D366]/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.52 1.09 2.52.73 2.98.69.46-.05 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#128C7E] flex items-center gap-1.5">
                      WhatsApp
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-[#128C7E]">Online</span>
                    </div>
                    <div className="text-xs text-slate-500">Chat with our team</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Auxiliary option if user wants to see all options or toll-free */}
              {onOpenCallModal && (
                <button
                  type="button"
                  id="quick-option-more"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCallModal();
                  }}
                  className="w-full text-center py-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition"
                >
                  Toll-Free 1300 586 573 &amp; Hours Info →
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative flex items-center">
        {/* Label Badge (Shown on larger screens when closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-3 hidden sm:flex items-center gap-1.5 bg-[#091b2f] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-700/60 pointer-events-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84d800] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84d800]"></span>
              </span>
              <span>Quick Call</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="quick-call-floating-btn"
          aria-label={isOpen ? 'Close quick call menu' : 'Open quick call options'}
          aria-expanded={isOpen}
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(116,203,0,0.45)] hover:shadow-[0_10px_30px_rgba(116,203,0,0.6)] active:scale-95 transition-all duration-300 ${
            isOpen 
              ? 'bg-[#091b2f] text-white shadow-xl' 
              : 'bg-gradient-to-tr from-[#74cb00] to-[#8cee00] text-[#091b2f]'
          }`}
        >
          {/* Subtle pulse ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#74cb00]/30 animate-ping pointer-events-none opacity-60"></span>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="phone"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};
