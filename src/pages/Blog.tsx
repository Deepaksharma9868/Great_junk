import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { CtaBanner } from '../components/CtaBanner';

const blogPosts = [
  {
    id: 1,
    title: "How to Prepare for a Deceased Estate Clearance",
    excerpt: "Clearing a deceased estate is an emotional and overwhelming process. Here are 5 practical steps to help you prepare before the removal team arrives.",
    date: "Aug 15, 2026",
    category: "Guides",
    image: "/images/office-clear-before.jpg"
  },
  {
    id: 2,
    title: "Where Does Your Rubbish Actually Go?",
    excerpt: "Ever wondered what happens after we drive away? Discover our eco-friendly sorting process and how we divert over 70% of collected junk from Melbourne landfills.",
    date: "Aug 02, 2026",
    category: "Eco-Friendly",
    image: "/images/hero-truck-loading.jpg"
  },
  {
    id: 3,
    title: "Top 3 Things You Should Never Put in a Skip Bin",
    excerpt: "Thinking of hiring a skip? Wait. Here are three common hazardous household items that will get you fined if you throw them in a standard skip bin.",
    date: "Jul 21, 2026",
    category: "Tips",
    image: "/images/garage-clean-before.jpg"
  },
  {
    id: 4,
    title: "Spring Cleaning: Reclaiming Your Garage in a Weekend",
    excerpt: "Is your garage a storage unit for things you never use? Follow this step-by-step weekend guide to sorting, donating, and finally parking your car inside again.",
    date: "Jul 10, 2026",
    category: "Tips",
    image: "/images/service-residential.webp"
  }
];

interface BlogProps {
  onOpenCall: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onOpenCall }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#091b2f] pt-16 pb-24 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="text-[#84d800] font-extrabold tracking-wider uppercase text-sm mb-4 block">
            Junk Removal Tips & News
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            The GJR Blog
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expert advice, local Melbourne news, and practical guides on decluttering, eco-friendly disposal, and managing your space.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-[#84d800] text-[#091b2f] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {post.category}
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-400 text-sm mb-4 font-medium">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#74cb00] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="inline-flex items-center font-bold text-[#091b2f] text-sm group-hover:text-[#74cb00] transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        onQuoteClick={() => navigate('/quote')}
        onCallClick={onOpenCall}
      />
    </>
  );
};
