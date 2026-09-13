import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 text-sm" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Services */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">GJR's Top Services</h4>
            <ol className="list-decimal pl-4 space-y-3 text-slate-300">
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Rubbish Removal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Junk Removal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Old Furniture Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Hoarder House Junk Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Furniture Disposal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Piano Disposal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Garage Clean Out</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Commercial Junk Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Deceased Estate Rubbish Removal</Link></li>
            </ol>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Useful Links</h4>
            <ul className="space-y-4 text-slate-300">
              <li><Link to="/why-gjr" className="hover:text-[#74cb00] transition-colors">About us</Link></li>
              <li><Link to="/blog" className="hover:text-[#74cb00] transition-colors">Blog</Link></li>
              <li><a href="/#services" className="hover:text-[#74cb00] transition-colors">Services</a></li>
              <li><Link to="/faq" className="hover:text-[#74cb00] transition-colors">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#74cb00] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">Opening Hours</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex justify-between items-center">
                <span>Mon</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Tue</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Wed</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Thu</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Fri</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sat</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sun</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:00AM - 7:00PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium mb-6 text-white">Contact us</h4>
            <p className="text-slate-300 text-base">0480 557 454</p>
            <p className="text-slate-300">info@greatjunkremovalist.com.au</p>
            
            <div className="w-full h-40 bg-slate-800 rounded-md overflow-hidden mt-4 mb-6">
              {/* Google Maps Embed for Melbourne */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008681.4395874457!2d144.316886!3d-37.971237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1714545931215!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Service Area Map"
              ></iframe>
            </div>

            <div>
              <h5 className="font-medium text-white mb-2 text-base">Follow us:</h5>
              <div className="flex gap-3 text-slate-300">
                <a href="#" className="hover:text-[#1877F2] transition-colors"><Facebook className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-[#E4405F] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#FF0000] transition-colors"><Youtube className="w-6 h-6 fill-current" /></a>
              </div>
            </div>

            <div className="pt-4 text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                We accept credit cards; Visa, Mastercard, American Express, Google Pay, Apple Pay, bank transfer and cash.*
              </p>
              {/* Fake payment icons for visual similarity */}
              <div className="flex gap-1.5 flex-wrap">
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">Pay</div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">GPay</div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">MC</div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">Visa</div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-black">Amex</div>
              </div>
              <p>*2.5% surcharge applies to card payments</p>
            </div>

          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 font-medium">
          <p className="mb-1">
            Copyright &copy; {new Date().getFullYear()} | Powered by Great Junk Removalist. All Rights Reserved.
          </p>
          <p>
            Website &amp; Marketing Managed by Digima Solutions
          </p>
        </div>

      </div>
    </footer>
  );
};
