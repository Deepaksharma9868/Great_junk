import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, MapPin, Calendar, CheckCircle, SplitSquareVertical, Columns2 } from 'lucide-react';
import { JobShowcase } from '../types';
import { INITIAL_JOBS } from '../data/initialJobs';
import { UploadDailyJobModal } from './UploadDailyJobModal';

const STORAGE_KEY = 'gjr_daily_jobs_v3';

export const WorkShowcase: React.FC = () => {
  const [jobs, setJobs] = useState<JobShowcase[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: JobShowcase[] = JSON.parse(saved);
        // Ensure no stale broken unsplash links remain in cache
        const hasBrokenLinks = parsed.some(
          (j) => j.beforeImage?.includes('unsplash') || j.afterImage?.includes('unsplash')
        );
        if (!hasBrokenLinks && parsed.length >= INITIAL_JOBS.length) {
          return parsed;
        }
      } catch (e) {
        console.error('Error loading jobs from localStorage', e);
      }
    }
    // Clean up stale cache from previous builds
    try {
      localStorage.removeItem('gjr_daily_jobs');
      localStorage.removeItem('gjr_daily_jobs_v2');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
    } catch (e) {
      console.warn('LocalStorage access restricted', e);
    }
    return INITIAL_JOBS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage for split-slider
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider'>('side-by-side');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const currentJob = jobs[currentIndex] || INITIAL_JOBS[0];

  const nextJob = () => {
    setCurrentIndex((prev) => (prev + 1) % jobs.length);
    setSliderPos(50);
  };

  const prevJob = () => {
    setCurrentIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
    setSliderPos(50);
  };

  const handleAddJob = (newJob: JobShowcase) => {
    const updated = [newJob, ...jobs];
    setJobs(updated);
    setCurrentIndex(0);
  };

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const width = rect.width;
    const pos = Math.max(5, Math.min(95, (x / width) * 100));
    setSliderPos(pos);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16" id="our-work">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Reviews Badge Pill (matching original design) */}
        <div className="flex justify-center mb-6">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#121417] hover:bg-black text-white rounded-full shadow-md text-xs font-semibold transition-colors cursor-pointer"
            id="work-google-reviews-badge"
          >
            {/* Google Logo Icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.36 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99Z"
              />
            </svg>
            <span className="font-bold text-white text-xs">5.0</span>
            <div className="flex text-[#f59e0b] text-xs">
              {'★★★★★'}
            </div>
            <span className="text-slate-400 text-[11px]">(938)</span>
          </a>
        </div>

        {/* Toolbar with View Mode Switch & Daily Upload feature */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#091b2f]">
              Before &amp; After Transformation Showcase
            </h3>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2 mt-0.5">
              <span>{currentJob.title}</span>
              <span>•</span>
              <span className="text-[#559400] font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Updated daily across Melbourne
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Side-by-Side vs Slider */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 text-xs">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-[#091b2f] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Side by Side Comparison"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Side-by-Side</span>
              </button>

              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition ${
                  viewMode === 'slider'
                    ? 'bg-white text-[#091b2f] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Interactive Slider Comparison"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slider</span>
              </button>
            </div>

            {/* Upload daily image button */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#84d800] hover:bg-[#77c900] active:scale-[0.98] text-[#091b2f] text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              id="open-upload-daily-job-btn"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>+ Upload Daily Job</span>
            </button>
          </div>
        </div>

        {/* Before & After Stage */}
        {viewMode === 'side-by-side' ? (
          /* SIDE-BY-SIDE MODE (Original Reference Design) */
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 select-none bg-slate-900 group"
            id="before-after-side-by-side-container"
          >
            <div className="grid grid-cols-2 w-full h-full">
              {/* LEFT HALF: BEFORE */}
              <div className="relative h-full w-full overflow-hidden border-r border-white/20 bg-slate-950">
                <img
                  src={currentJob.beforeImage}
                  alt={`${currentJob.title} before removal`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* "Before" Badge (Vibrant lime green) */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-[#84d800] text-[#091b2f] font-extrabold text-xs rounded-md shadow">
                    Before
                  </span>
                </div>

                {/* Job Title at bottom left */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                  <span className="text-white font-extrabold text-sm sm:text-base md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                    {currentJob.title}
                  </span>
                </div>
              </div>

              {/* RIGHT HALF: AFTER */}
              <div className="relative h-full w-full overflow-hidden bg-slate-950">
                <img
                  src={currentJob.afterImage}
                  alt={`${currentJob.title} after cleanup`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* "After" Badge (Vibrant lime green) */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-[#84d800] text-[#091b2f] font-extrabold text-xs rounded-md shadow">
                    After
                  </span>
                </div>

                {/* Great Junk Removalist Watermark top-right */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded text-white/90 text-[10px] sm:text-xs font-bold shadow">
                  <span className="text-[#84d800]">GJR</span>
                  <span className="hidden sm:inline">Great Junk Removalist</span>
                </div>
              </div>
            </div>

            {/* Next / Prev Navigation Buttons */}
            <button
              onClick={prevJob}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
              aria-label="Previous job"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextJob}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
              aria-label="Next job"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        ) : (
          /* INTERACTIVE SLIDER MODE */
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 select-none bg-slate-900 group"
            id="before-after-slider-container"
            onMouseMove={(e) => {
              if (isDragging) {
                handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
          >
            {/* AFTER IMAGE (Underneath / Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentJob.afterImage}
                alt={`${currentJob.title} after cleanup`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* "After" Badge (Lime green) */}
              <div className="absolute top-4 right-4 sm:left-[52%] z-10">
                <span className="inline-block px-3 py-1 bg-[#84d800] text-[#091b2f] font-extrabold text-xs rounded-md shadow">
                  After
                </span>
              </div>

              {/* Great Junk Removalist Watermark top-right */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-white/90 text-[10px] font-bold">
                <span className="text-[#84d800]">GJR</span>
                <span>Great Junk Removalist</span>
              </div>
            </div>

            {/* BEFORE IMAGE (Clipped on Left) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full" style={{ width: '100%', minWidth: '100%' }}>
                <img
                  src={currentJob.beforeImage}
                  alt={`${currentJob.title} before cleanup`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%' }}
                  referrerPolicy="no-referrer"
                />
                {/* "Before" Badge (Lime green) */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-[#84d800] text-[#091b2f] font-extrabold text-xs rounded-md shadow">
                    Before
                  </span>
                </div>
              </div>
            </div>

            {/* Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-1 h-full bg-white shadow-lg" />
              <div className="absolute w-8 h-8 rounded-full bg-white border-2 border-[#84d800] shadow-md flex items-center justify-center text-slate-700 hover:scale-110 transition-transform">
                <div className="flex gap-0.5">
                  <span className="block w-0.5 h-3 bg-slate-500 rounded-full" />
                  <span className="block w-0.5 h-3 bg-slate-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Bottom Left Title Caption Overlay */}
            <div className="absolute bottom-4 left-4 z-20 bg-black/75 backdrop-blur-xs px-3.5 py-1.5 rounded-lg text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>{currentJob.title}</span>
              <span className="text-slate-400 text-xs hidden sm:inline">| {currentJob.suburb}</span>
            </div>

            {/* Next / Prev Navigation Buttons */}
            <button
              onClick={prevJob}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100"
              aria-label="Previous job"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextJob}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100"
              aria-label="Next job"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Slider Pagination Dots (Matching screenshot with 8 dots) */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          {jobs.slice(0, 8).map((job, idx) => (
            <button
              key={job.id || idx}
              onClick={() => {
                setCurrentIndex(idx);
                setSliderPos(50);
              }}
              title={job.title}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 h-2 bg-slate-800'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to ${job.title}`}
            />
          ))}
        </div>

        {/* Job Details & SEO Tags Box */}
        {currentJob.description && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">{currentJob.title}: </span>
              <span>{currentJob.description}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-medium flex-shrink-0">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#559400]" />
                {currentJob.suburb}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#559400]" />
                {currentJob.date}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Modal for daily photo uploads */}
      <UploadDailyJobModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddJob={handleAddJob}
      />
    </section>
  );
};
