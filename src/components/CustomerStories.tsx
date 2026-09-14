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
  const [expandedStories, setExpandedStories] = useState<{ [id: string]: boolean }>({});

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
      className="w-full bg-[#091b2f] py-14 sm:py-20 border-t border-b border-slate-800 text-white relative overflow-hidden"
      id="reviews"
    >
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Dark Blue Container (like Image 2) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-[#0b1626] border border-[#1d2f47] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative"
        >
          {/* Top Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              {/* Google Reviews Header */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.36 7.31 24 12 24Z" />
                  <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15Z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99Z" />
                </svg>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">Google</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">Reviews</span>
              </div>

              {/* Rating & Stars */}
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg sm:text-xl">0.0</span>
                <div className="flex text-[#f59e0b] text-base sm:text-lg tracking-wider">
                  ★★★★★
                </div>
                <span className="text-slate-400 text-sm font-medium">(0)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 hover:shadow-blue-500/20"
                id="review-google-btn"
              >
                <span>Review us on Google</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 bg-[#84d800] hover:bg-[#77c900] text-[#091b2f] text-xs sm:text-sm font-extrabold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                id="write-customer-story-btn"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Share Story</span>
              </button>
            </div>
          </div>

          {/* Cards Carousel Area with Side Navigation Buttons */}
          <div className="relative">
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-700/90 hover:bg-slate-600 text-white backdrop-blur-xs flex items-center justify-center shadow-lg transition cursor-pointer border border-slate-600"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-700/90 hover:bg-slate-600 text-white backdrop-blur-xs flex items-center justify-center shadow-lg transition cursor-pointer border border-slate-600"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* 3 Review Cards Grid (responsive: 1 on mobile, 2 on tablet, 3 on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[0, 1, 2].map((offset, colIdx) => {
                const story = stories[(currentIndex + offset) % stories.length];
                const isExpanded = expandedStories[story.id];
                const hiddenClass = colIdx === 1 ? 'hidden md:flex' : colIdx === 2 ? 'hidden lg:flex' : 'flex';

                return (
                  <div
                    key={story.id}
                    className={`${hiddenClass} flex-col justify-between h-full bg-[#131f31] hover:bg-[#16253b] border border-[#213550] rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-md min-h-[260px]`}
                  >
                    <div>
                      {/* Top Row: User Avatar with Google Icon + Name + Verified Badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs ${
                                story.avatarBg || 'bg-blue-600'
                              }`}
                            >
                              {story.initials}
                            </div>
                            {/* Mini Google G Badge on Avatar */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-xs border border-white">
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z" />
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.36 7.31 24 12 24Z" />
                                <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15Z" />
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99Z" />
                              </svg>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-white">{story.authorName}</span>
                              {story.verified && (
                                <svg className="w-4 h-4 fill-[#1a73e8] text-white shrink-0" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              )}
                            </div>
                            <span className="text-slate-400 text-xs block">{story.timeAgo}</span>
                          </div>
                        </div>
                      </div>

                      {/* 5 Gold Stars */}
                      <div className="flex items-center gap-1 mb-2 text-[#f59e0b] text-base tracking-wider">
                        ★★★★★
                      </div>

                      {/* Review Headline & Body */}
                      <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                        "{story.storyTitle}"
                      </h4>

                      <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {story.reviewText}
                      </p>

                      {story.reviewText.length > 130 && (
                        <button
                          onClick={() => setExpandedStories((prev) => ({ ...prev, [story.id]: !prev[story.id] }))}
                          className="text-[#1a73e8] hover:text-blue-400 text-xs font-semibold mt-1 transition-colors cursor-pointer"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}

                      {/* Highlight Tag */}
                      {story.highlight && (
                        <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-[#84d800]/10 border border-[#84d800]/25 rounded-xl text-xs font-medium text-[#a3f71b] leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#84d800] shrink-0 mt-0.5" />
                          <span className="break-words">{story.highlight}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Meta & Helpful Button */}
                    <div className="mt-4 pt-3 border-t border-[#1d2f47] flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-400 text-[11px] truncate">{story.suburb}</span>
                      <button
                        onClick={() => handleHelpful(story.id)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition px-2 py-0.5 rounded bg-[#1c2e47] hover:bg-[#253e61] border border-[#263e5e] cursor-pointer shrink-0"
                        title="Mark review as helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful ({helpfulCounts[story.id] || 0})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {stories.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
          </div>

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
