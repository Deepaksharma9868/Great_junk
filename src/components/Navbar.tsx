import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCall }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9" id="desktop-nav">
            <a
              href="#"
              className="text-slate-800 hover:text-[#74cb00] font-semibold text-sm transition-colors"
              id="nav-link-home"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-slate-700 hover:text-[#74cb00] font-medium text-sm transition-colors"
              id="nav-link-services"
            >
              Services
            </a>
            <a
              href="#our-work"
              className="text-slate-700 hover:text-[#74cb00] font-medium text-sm transition-colors"
              id="nav-link-our-work"
            >
              Our work
            </a>
            <a
              href="#reviews"
              className="text-slate-700 hover:text-[#74cb00] font-medium text-sm transition-colors"
              id="nav-link-reviews"
            >
              Reviews
            </a>
          </nav>

          {/* Right Call Us Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenCall}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-[#84d800] hover:bg-[#77c900] active:scale-[0.98] text-[#0a1c32] font-bold text-sm rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              id="header-call-btn"
            >
              <span>Call Us</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCall}
              className="p-2 bg-[#84d800] text-[#0a1c32] rounded-lg"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-slate-900 hover:bg-slate-50"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
          >
            Services
          </a>
          <a
            href="#our-work"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
          >
            Our work
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50"
          >
            Reviews
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCall();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#84d800] text-[#0a1c32] font-bold rounded-lg shadow"
            >
              <span>Call Us: 1300 586 573</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
