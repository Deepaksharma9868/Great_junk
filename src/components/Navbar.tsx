import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCall }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => 
    `font-semibold text-sm transition-colors ${isActive(path) ? 'text-[#74cb00]' : 'text-slate-700 hover:text-[#74cb00]'}`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md font-medium transition-colors ${isActive(path) ? 'text-[#74cb00] bg-slate-50' : 'text-slate-700 hover:bg-slate-50 hover:text-[#74cb00]'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Logo size="md" showTagline={false} />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9" id="desktop-nav">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <Link to="/why-gjr" className={linkClass('/why-gjr')}>
              Why GJR
            </Link>
            <Link to="/faq" className={linkClass('/faq')}>
              FAQ
            </Link>
            <Link to="/quote" className={linkClass('/quote')}>
              Get Quote
            </Link>
          </nav>

          {/* Right Call Us Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/quote" 
              className="text-[#0a1c32] hover:text-[#74cb00] font-bold text-sm transition-colors"
            >
              Book Now
            </Link>
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
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/')}
          >
            Home
          </Link>
          <Link
            to="/why-gjr"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/why-gjr')}
          >
            Why GJR
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/faq')}
          >
            FAQ
          </Link>
          <Link
            to="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileLinkClass('/quote')}
          >
            Get Quote
          </Link>
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
