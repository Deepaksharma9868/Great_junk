import React from 'react';
import { X, Phone, Clock, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      id="call-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        id="call-modal"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          aria-label="Close call modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4 pt-2">
          {/* Green Phone Icon */}
          <div className="w-14 h-14 bg-[#eaf8dd] text-[#74cb00] rounded-full mx-auto flex items-center justify-center">
            <Phone className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#091b2f] tracking-tight">
              Call Great Junk Removalist
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Speak directly to our Melbourne team for instant quotes &amp; same-day booking
            </p>
          </div>

          {/* Primary Phone Button */}
          <div className="space-y-2.5 pt-2">
            <a
              href="tel:1300586573"
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-[#84d800] hover:bg-[#77c900] active:scale-[0.98] text-[#091b2f] font-extrabold text-lg rounded-xl shadow-md transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>1300 586 573</span>
            </a>

            <a
              href="tel:0488858657"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <span>Direct Mobile / SMS: 0488 858 657</span>
            </a>
          </div>

          {/* Details */}
          <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-left text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#559400] flex-shrink-0" />
              <span>Open 7 Days · 7:30 AM – 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#559400] flex-shrink-0" />
              <span>All Melbourne Suburbs &amp; Surrounding Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#559400] flex-shrink-0" />
              <span>Fully Insured &amp; Certified Eco-Disposal</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
