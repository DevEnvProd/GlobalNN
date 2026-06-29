import { useState, useEffect } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export default function BreakingNews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const urgentStories = [
    'BREAKING: Geneva Summit seals historic $1.2T Green Energy hyper-grid accord.',
    'JUST IN: National high-speed rail network approved in bipartisan Senate vote.',
    'ALERT: AI Neural implants demonstrate flawless clinical trial success in Boston.',
    'MARKETS: Dow and S&P climb to record highs following positive Federal Reserve outlook.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % urgentStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [urgentStories.length]);

  return (
    <div className="bg-red-50 border-y border-red-200 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
        {/* Urgent Alert Tag */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="flex items-center space-x-1.5 bg-red-600 text-white font-extrabold px-2 py-1 rounded-xs uppercase text-[10px] tracking-wider shadow-sm animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Breaking</span>
          </span>
          <span className="text-red-700 hidden md:block">
            <AlertCircle className="w-4 h-4" />
          </span>
        </div>

        {/* Story Text with smooth transition key */}
        <div className="flex-1 mx-4 overflow-hidden">
          <p className="font-bold text-neutral-900 truncate hover:text-red-600 transition-colors cursor-pointer text-center md:text-left">
            {urgentStories[currentIndex]}
          </p>
        </div>

        {/* Story Controls */}
        <div className="flex items-center space-x-1 shrink-0">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + urgentStories.length) % urgentStories.length)}
            className="p-1 rounded-full text-red-700 hover:bg-red-100 focus:outline-hidden transition-colors"
            title="Previous Alert"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % urgentStories.length)}
            className="p-1 rounded-full text-red-700 hover:bg-red-100 focus:outline-hidden transition-colors"
            title="Next Alert"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
