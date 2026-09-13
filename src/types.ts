export interface JobShowcase {
  id: string;
  title: string;
  serviceCategory: string;
  suburb: string;
  date: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
  verified?: boolean;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  description: string;
  photos: string[];
}

export interface CustomerStory {
  id: string;
  authorName: string;
  suburb: string;
  serviceCategory: string;
  rating: number;
  timeAgo: string;
  storyTitle: string;
  reviewText: string;
  highlight?: string;
  avatarBg?: string;
  initials: string;
  verified: boolean;
  avatarUrl?: string;
}
