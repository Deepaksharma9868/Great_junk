import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  MapPin,
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  X,
  Send,
  ThumbsUp,
} from 'lucide-react';
import { CustomerStory } from '../types';
import { INITIAL_CUSTOMER_STORIES } from '../data/customerStories';

const STORAGE_KEY = 'gjr_customer_stories_v2';
const AUTO_SLIDE_INTERVAL = 2500; // Reduced to 2.5 seconds for faster auto-sliding

export const CustomerStories: React.FC = () => {
  const [stories, setStories] = useState<CustomerStory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_CUSTOMER_STORIES.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read customer stories from localStorage', e);
    }
    return INITIAL_CUSTOMER_STORIES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({
    'story-1': 19,
    'story-2': 14,
    'story-3': 28,
    'story-4': 11,
    'story-5': 22,
    'story-6': 9,
    'story-7': 8,
    'story-8': 16,
  });

  // Modal form state
  const [formData, setFormData] = useState({
    authorName: '',
    suburb: '',
    serviceCategory: 'Residential Rubbish Removal',
    rating: 5,
    storyTitle: '',
    reviewText: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isHovered || isModalOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [stories.length, isHovered, isModalOpen]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (e) {
      console.warn('Could not save customer stories', e);
    }
  }, [stories]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handleHelpful = (storyId: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [storyId]: (prev[storyId] || 0) + 1,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorName || !formData.reviewText) return;

    const initials =
      formData.authorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'CU';

    const newStory: CustomerStory = {
      id: `story-${Date.now()}`,
      authorName: formData.authorName,
      suburb: formData.suburb ? `${formData.suburb}, Melbourne` : 'Melbourne, VIC',
      serviceCategory: formData.serviceCategory,
      rating: formData.rating,
      timeAgo: 'Just now',
      storyTitle: formData.storyTitle || `${formData.serviceCategory} Review`,
      reviewText: formData.reviewText,
      highlight: 'Verified Melbourne Customer Story',
      avatarBg: 'bg-emerald-600',
      initials,
      verified: true,
    };

    setStories([newStory, ...stories]);
    setCurrentIndex(0);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setFormData({
        authorName: '',
        suburb: '',
        serviceCategory: 'Residential Rubbish Removal',
        rating: 5,
        storyTitle: '',
        reviewText: '',
      });
    }, 1500);
  };

  const currentStory = stories[currentIndex] || stories[0];

  return (
    <section
      className="w-full bg-[#f8fafc] py-10 sm:py-12 border-t border-b border-slate-200/90 relative"
      id="reviews"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xl sm:text-2xl font-black text-[#091b2f] tracking-tight">
                  Real Stories from{' '}
                  <span className="text-[#559400]">Satisfied Customers</span>
                </span>
                
                {/* Google 5.0 Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs shrink-0">
                  <span className="text-blue-600 font-extrabold">G</span>
                  <span className="text-amber-400">★★★★★</span>
                  <span className="text-slate-500 font-semibold text-[11px]">(934+)</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentic reviews from Melbourne locals. Stories advance automatically.
              </p>
            </div>
          </div>

          {/* Controls: Prev / Next / Add Story */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 bg-white hover:bg-slate-100 text-[#091b2f] border border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-slate-500 px-1 min-w-[42px] text-center">
              {currentIndex + 1} / {stories.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 bg-white hover:bg-slate-100 text-[#091b2f] border border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-2 bg-[#84d800] hover:bg-[#77c900] text-[#091b2f] text-xs font-extrabold rounded-lg shadow-2xs transition-all cursor-pointer shrink-0"
              id="write-customer-story-btn"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Share Story</span>
            </button>
          </div>
        </div>

        {/* Compact Auto-Sliding Card Window */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 overflow-hidden"
        >
          {/* Subtle Auto-Slide Progress Bar at top of card */}
          {!isHovered && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
              <div
                key={currentIndex}
                className="h-full bg-[#84d800]"
                style={{
                  animation: 'progressBar 2.5s linear infinite',
                }}
              />
            </div>
          )}

          {/* Quote Icon Backdrop */}
          <MessageSquareQuote className="absolute top-5 right-6 w-16 h-16 text-slate-100/90 pointer-events-none stroke-1" />

          {/* Card Content with Smooth Transition */}
          <div key={currentStory.id} className="relative z-10 transition-opacity duration-300">
            
            {/* Top Row: Stars, Category & Time */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(currentStory.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">5.0 Star Experience</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {currentStory.serviceCategory}
                </span>
                <span className="text-xs text-slate-400">• {currentStory.timeAgo}</span>
              </div>
            </div>

            {/* Story Headline */}
            <h3 className="text-base sm:text-lg font-bold text-[#091b2f] mb-2 leading-snug">
              "{currentStory.storyTitle}"
            </h3>

            {/* Story Review Text */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {currentStory.reviewText}
            </p>

            {/* Highlight Pill (if present) */}
            {currentStory.highlight && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#84d800]/10 border border-[#84d800]/30 rounded-lg text-xs font-semibold text-[#2d5200]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#559400] shrink-0" />
                <span>{currentStory.highlight}</span>
              </div>
            )}

            {/* Bottom Row: Author details & Helpful counter */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xs ${
                    currentStory.avatarBg || 'bg-slate-700'
                  }`}
                >
                  {currentStory.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#091b2f]">
                      {currentStory.authorName}
                    </span>
                    {currentStory.verified && (
                      <span title="Verified Customer" className="text-blue-500">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{currentStory.suburb}</span>
                  </div>
                </div>
              </div>

              {/* Helpful Vote Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleHelpful(currentStory.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#559400] transition cursor-pointer px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200/80"
                  title="Mark review as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({helpfulCounts[currentStory.id] || 0})</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Small Dot Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {stories.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 bg-[#84d800]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Jump to story ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Share Your Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#84d800]/20 flex items-center justify-center text-[#559400]">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#091b2f]">Share Your Cleanout Experience</h3>
                <p className="text-xs text-slate-500">Your review helps fellow Melburnians make the right choice</p>
              </div>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Thank You For Your Story!</h4>
                <p className="text-xs text-slate-500">Your review has been added to our satisfied customer stories.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David & Fiona Miller"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84d800]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Melbourne Suburb</label>
                    <input
                      type="text"
                      placeholder="e.g. Hawthorn, Melbourne"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84d800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Cleaned</label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84d800] bg-white"
                    >
                      <option>Residential Rubbish Removal</option>
                      <option>Commercial Rubbish Removal</option>
                      <option>Construction Rubbish Removal</option>
                      <option>Deceased Estate Clearance</option>
                      <option>Piano Removal</option>
                      <option>Green Waste Removal</option>
                      <option>Spa & Hot Tub Removal</option>
                      <option>Clean Ups & Hoarder Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="cursor-pointer p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {formData.rating} out of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Story Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arrived on time and swept the garage spotless!"
                    value={formData.storyTitle}
                    onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84d800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Story</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the team, punctuality, pricing, and how your space looks now..."
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84d800]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#84d800] hover:bg-[#77c900] text-[#091b2f] text-xs font-bold rounded-lg shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Story</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
