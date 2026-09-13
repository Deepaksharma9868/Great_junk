import React, { useState, useRef } from 'react';
import { X, Upload, Check, Sparkles, Image as ImageIcon, MapPin, Calendar } from 'lucide-react';
import { JobShowcase } from '../types';

interface UploadDailyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: JobShowcase) => void;
}

export const UploadDailyJobModal: React.FC<UploadDailyJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
}) => {
  const [title, setTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Residential Junk');
  const [suburb, setSuburb] = useState('Melbourne VIC');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');
  const [error, setError] = useState('');

  const beforeFileRef = useRef<HTMLInputElement>(null);
  const afterFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        if (type === 'before') {
          setBeforeImage(reader.result as string);
        } else {
          setAfterImage(reader.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSampleFill = (service: string) => {
    setTitle(`${service} Project`);
    setServiceCategory(service);
    setSuburb('Richmond, Melbourne');
    setDescription(`Completed same-day ${service.toLowerCase()} on schedule. Fully loaded and recycled.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeImage || !afterImage) {
      setError('Please upload both a Before image and an After image.');
      return;
    }

    const newJob: JobShowcase = {
      id: `job-${Date.now()}`,
      title: title || `${serviceCategory} Clearance`,
      serviceCategory,
      suburb: suburb || 'Melbourne VIC',
      date: date || new Date().toISOString().split('T')[0],
      beforeImage,
      afterImage,
      description: description || 'Same-day junk removal in Melbourne.',
      verified: true,
    };

    onAddJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" id="daily-upload-modal">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#84d800] animate-pulse" />
              <h3 className="text-lg font-bold text-[#091b2f]">Daily Work Upload</h3>
            </div>
            <p className="text-xs text-slate-500">
              Post today's completed job photos to update the live showcase &amp; boost Melbourne local SEO
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Before & After Upload Dropzones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Photo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                1. Before Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                ref={beforeFileRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'before')}
                className="hidden"
              />
              <div
                onClick={() => beforeFileRef.current?.click()}
                className={`relative h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 cursor-pointer transition-all ${
                  beforeImage
                    ? 'border-[#84d800] bg-slate-50'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                {beforeImage ? (
                  <>
                    <img
                      src={beforeImage}
                      alt="Before Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Before
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                      Change photo
                    </span>
                  </>
                ) : (
                  <div className="text-center space-y-2 text-slate-500">
                    <div className="w-10 h-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Upload Before Photo</p>
                    <p className="text-[10px] text-slate-400">Drag &amp; drop or click to browse</p>
                  </div>
                )}
              </div>
            </div>

            {/* After Photo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                2. After Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                ref={afterFileRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'after')}
                className="hidden"
              />
              <div
                onClick={() => afterFileRef.current?.click()}
                className={`relative h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-3 cursor-pointer transition-all ${
                  afterImage
                    ? 'border-[#84d800] bg-slate-50'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                {afterImage ? (
                  <>
                    <img
                      src={afterImage}
                      alt="After Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-[#84d800] text-[#091b2f] text-[10px] font-bold px-2 py-0.5 rounded">
                      After
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                      Change photo
                    </span>
                  </>
                ) : (
                  <div className="text-center space-y-2 text-slate-500">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#84d800]/20 flex items-center justify-center text-[#559400]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Upload After Photo</p>
                    <p className="text-[10px] text-slate-400">Cleaned space result</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category selector buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Quick Service Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Spa Removal', 'Residential Junk', 'Commercial Junk', 'Green Waste', 'Construction Debris', 'Deceased Estate'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSampleFill(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition cursor-pointer ${
                    serviceCategory === preset
                      ? 'bg-[#84d800] border-[#84d800] text-[#091b2f] font-bold'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Form details: Title, Category, Suburb, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Spa Removal, Garage Cleanout"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#84d800] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service Category
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#84d800] focus:outline-none"
              >
                <option value="Spa Removal">Spa Removal</option>
                <option value="Residential Junk">Residential Junk</option>
                <option value="Deceased Estate">Deceased Estate</option>
                <option value="Commercial Junk">Commercial Junk</option>
                <option value="Construction Debris">Construction Debris</option>
                <option value="Piano Removal">Piano Removal</option>
                <option value="Green Waste">Green Waste</option>
                <option value="Metal Removal">Metal Removal</option>
                <option value="Cardboard Removal">Cardboard Removal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Melbourne Suburb
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="e.g. South Yarra, Richmond, St Kilda"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#84d800] focus:outline-none"
                />
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Completion Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#84d800] focus:outline-none"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Description / SEO Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Cleared 2 truckloads of basement clutter in Hawthorn. Recycled 80%."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#84d800] focus:outline-none resize-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#84d800] hover:bg-[#77c900] text-[#091b2f] text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Publish to Showcase</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
