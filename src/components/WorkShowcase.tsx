import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, MapPin, Calendar, CheckCircle, SplitSquareVertical, Columns2 } from 'lucide-react';
import { JobShowcase } from '../types';
import { INITIAL_JOBS } from '../data/initialJobs';
import { UploadDailyJobModal } from './UploadDailyJobModal';

import { GoogleReviewBadge } from './GoogleReviewBadge';
import { APIProvider } from '@vis.gl/react-google-maps';

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
          {import.meta.env.VITE_GOOGLE_MAPS_API_KEY && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== 'dummy_key' ? (
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <GoogleReviewBadge placeId="ChIJ_x5w2j9C1moRvjH2q0o0lD0" />
            </APIProvider>
          ) : (
            <GoogleReviewBadge placeId="ChIJ_x5w2j9C1moRvjH2q0o0lD0" />
          )}
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
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 select-none touch-none bg-slate-900 group"
            id="before-after-slider-container"
            onMouseMove={(e) => {
              if (isDragging) {
                handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }
            }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchCancel={() => setIsDragging(false)}
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
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={currentJob.beforeImage}
                alt={`${currentJob.title} before cleanup`}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* "Before" Badge (Lime green) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 bg-[#84d800] text-[#091b2f] font-extrabold text-xs rounded-md shadow">
                  Before
                </span>
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
