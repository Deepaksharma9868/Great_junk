import React, { useState, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface GoogleReviewBadgeProps {
  placeId: string;
  fallbackRating?: number;
  fallbackCount?: number;
}

export const GoogleReviewBadge: React.FC<GoogleReviewBadgeProps> = ({ 
  placeId, 
  fallbackRating = 5.0, 
  fallbackCount = 938 
}) => {
  const placesLib = useMapsLibrary('places');
  const [rating, setRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!placesLib || !placeId) return;
    
    const getPlaceData = async () => {
      try {
        const { Place } = placesLib;
        const place = new Place({
          id: placeId,
          requestedLanguage: 'en',
        });
        
        await place.fetchFields({
          fields: ['rating', 'userRatingCount']
        });

        if (place.rating) setRating(place.rating);
        if (place.userRatingCount) setReviewCount(place.userRatingCount);
      } catch (error) {
        console.error("Failed to fetch Google Maps Place data", error);
      }
    };
    
    getPlaceData();
  }, [placesLib, placeId]);

  const displayRating = rating !== null ? rating.toFixed(1) : fallbackRating.toFixed(1);
  const displayCount = reviewCount !== null ? reviewCount : fallbackCount;

  return (
    <a
      href="#reviews"
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#121417] hover:bg-black text-white rounded-full shadow-lg transition-colors cursor-pointer border border-slate-800"
      id="work-google-reviews-badge"
    >
      {/* Google Logo Icon */}
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.36 7.31 24 12 24Z" />
        <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15Z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99Z" />
      </svg>
      <span className="font-bold text-white text-base">{displayRating}</span>
      <div className="flex text-[#f59e0b] text-base tracking-widest">
        {'★★★★★'}
      </div>
      <span className="text-slate-400 text-sm font-medium">({displayCount})</span>
    </a>
  );
};
