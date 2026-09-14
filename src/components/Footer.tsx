import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 text-sm" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Services */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white">GJR's Top Services</h4>
            <ol className="list-decimal pl-4 space-y-3 text-slate-300">
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Commercial Junk Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Residential Junk Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Rubbish Removal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Junk Removal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Old Furniture Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Hoarder House Junk Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Furniture Disposal Melbourne</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Garage Clean Out</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Deceased Estate Rubbish Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Spa Removal</Link></li>
              <li><Link to="/quote" className="hover:text-[#74cb00] transition-colors border-b border-slate-300 hover:border-[#74cb00]">Piano Disposal Melbourne</Link></li>
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
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Tue</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Wed</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Thu</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Fri</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sat</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sun</span>
                <span className="flex-1 border-b border-dotted border-slate-600 mx-2"></span>
                <span>7:30AM - 7:00PM</span>
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
              <h5 className="font-medium text-white mb-3 text-base">Follow us:</h5>
              <div className="flex items-center gap-3" id="social-links">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/share/1GPPJ5jNGF/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/40 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5 fill-white text-white" />
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/greatjunkremovalist?stkn=MTFnNmVieHk4NWJt&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow hover:scale-110 hover:shadow-lg hover:shadow-[#dc2743]/40 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5 text-white stroke-[2.2]" />
                </a>

                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@great.junk.removalist?_r=1&_t=ZS-99hckTQdHMr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                  className="w-9 h-9 rounded-full bg-black border border-slate-700 flex items-center justify-center text-white shadow hover:scale-110 hover:shadow-lg hover:border-slate-500 hover:shadow-cyan-500/20 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" 
                      fill="#25F4EE" 
                      transform="translate(-0.8, -0.8)" 
                    />
                    <path 
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" 
                      fill="#FE2C55" 
                      transform="translate(0.8, 0.8)" 
                    />
                    <path 
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" 
                      fill="#FFFFFF" 
                    />
                  </svg>
                </a>
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
