import React, { useState, useRef } from 'react';
import { ArrowRight, Upload, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteSectionProps {
  selectedService?: string;
  onServiceSelect?: (service: string) => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  selectedService = '',
  onServiceSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    suburb: '',
    service: selectedService,
    description: '',
    photos: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync selected service if updated from props
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      suburb: '',
      service: '',
      description: '',
      photos: [],
    });
  };

  return (
    <section className="w-full bg-[#f4f8fc] py-16 md:py-24" id="quote-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Let's Clear Your Space */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[#6bb500] font-extrabold text-xs tracking-widest uppercase">
                LET'S CLEAR YOUR SPACE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091b2f] tracking-tight leading-tight">
                Your fresh start begins here.
              </h2>
            </div>

            <p className="text-slate-800 font-medium text-base leading-relaxed">
              Tell us what needs to go. Share a few details and request a quote for your junk removal.
            </p>

            {/* Pricing Callout */}
            <div className="pt-2">
              <p className="text-base sm:text-lg font-bold text-[#091b2f]">
                All-Inclusive Pricing — From $99
              </p>
              <p className="text-slate-800 font-medium text-sm mt-1">
                No hidden fees. Labour, loading and removal are included.
              </p>
            </div>

            {/* 3 Steps */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-[#e3f7d1] text-[#428400] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  01
                </span>
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Tell us about your junk
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-[#e3f7d1] text-[#428400] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  02
                </span>
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Request your personalised quote
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-[#e3f7d1] text-[#428400] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  03
                </span>
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Arrange your removal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/80" id="quote-card">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#091b2f] mb-6">
                Get a Quote
              </h3>

              {submitted ? (
                <div className="py-8 text-center space-y-4" id="quote-success-message">
                  <div className="w-16 h-16 bg-[#eaf8dd] text-[#74cb00] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    Quote Request Received!
                  </h4>
                  <p className="text-slate-600 max-w-md mx-auto text-sm">
                    Thanks <span className="font-semibold">{formData.fullName || 'there'}</span>! Our Melbourne dispatch team is reviewing your details now and will contact you at <span className="font-semibold text-slate-900">{formData.phone}</span> within 15 minutes with a fixed price estimate.
                  </p>
                  <div className="p-4 bg-slate-50 rounded-xl max-w-sm mx-auto text-left text-xs text-slate-500 space-y-1">
                    <p><span className="font-medium text-slate-700">Service:</span> {formData.service || 'General Rubbish Removal'}</p>
                    <p><span className="font-medium text-slate-700">Location:</span> {formData.suburb || 'Melbourne'}</p>
                    {formData.photos.length > 0 && (
                      <p><span className="font-medium text-slate-700">Photos attached:</span> {formData.photos.length} files</p>
                    )}
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="get-quote-form">
                  {/* Row 1: Full name + Phone number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-name">
                        Full name
                      </label>
                      <input
                        id="field-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-phone">
                        Phone number
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your phone number"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email address + Suburb / postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-email">
                        Email address
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-suburb">
                        Suburb / postcode
                      </label>
                      <input
                        id="field-suburb"
                        type="text"
                        required
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        placeholder="Your Melbourne suburb"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service required */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-service">
                      Service required
                    </label>
                    <select
                      id="field-service"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (onServiceSelect) onServiceSelect(e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="Residential Rubbish Removal">Residential Rubbish Removal</option>
                      <option value="Commercial Rubbish Removal">Commercial Rubbish Removal</option>
                      <option value="Construction Rubbish Removal">Construction Rubbish Removal</option>
                      <option value="Clean Ups">Clean Ups (NDIS, Deceased Estate, Hoarders)</option>
                      <option value="Residential Junk">Residential Junk</option>
                      <option value="Deceased Estate">Deceased Estate</option>
                      <option value="Commercial Junk">Commercial Junk</option>
                      <option value="Construction Debris">Construction Debris</option>
                      <option value="Piano Removal">Piano Removal</option>
                      <option value="Green Waste">Green Waste</option>
                      <option value="Metal Removal">Metal Removal</option>
                      <option value="Spa Removal">Spa Removal</option>
                      <option value="Cardboard Removal">Cardboard Removal</option>
                      <option value="General Rubbish">General Rubbish / Other</option>
                    </select>
                  </div>

                  {/* Row 4: What would you like removed? */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="field-desc">
                      What would you like removed?
                    </label>
                    <textarea
                      id="field-desc"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your items and approximate quantity"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84d800] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Row 5: Add Photos of your junk */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="junk-photo-input"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 px-4 bg-[#f0f4f9] hover:bg-[#e6edf6] border border-dashed border-slate-300 rounded-lg text-slate-700 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      id="add-photos-btn"
                    >
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span>+ Add photos of your junk · Optional</span>
                    </button>

                    {/* Thumbnail previews */}
                    {formData.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.photos.map((photoUrl, idx) => (
                          <div key={idx} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                            <img
                              src={photoUrl}
                              alt={`Upload preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-90 hover:opacity-100"
                              title="Remove photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#84d800] hover:bg-[#77c900] active:scale-[0.99] text-[#091a2e] font-extrabold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75"
                      id="submit-quote-btn"
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Get a Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Disclaimer subtext */}
                  <p className="text-center text-slate-400 text-xs mt-3">
                    By submitting, you agree to be contacted about your quote.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
