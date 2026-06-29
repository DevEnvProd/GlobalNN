import { useState, useEffect } from 'react';
import { Search, Calendar, Globe, Bookmark, TrendingUp, X, Bell } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onGoHome: () => void;
}

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  savedCount,
  onOpenBookmarks,
  onGoHome,
}: HeaderProps) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [tickerIndex, setTickerIndex] = useState(0);

  const marketTickers = [
    { name: 'S&P 500', value: '5,420.22', change: '+0.45%', positive: true },
    { name: 'DOW JONES', value: '39,120.50', change: '-0.12%', positive: false },
    { name: 'NASDAQ', value: '17,812.90', change: '+1.10%', positive: true },
    { name: 'NIKKEI 225', value: '38,642.00', change: '+0.88%', positive: true },
    { name: 'BTC/USD', value: '64,150.00', change: '+2.45%', positive: true },
    { name: 'GOLD/OZ', value: '2,325.40', change: '-0.32%', positive: false },
  ];

  useEffect(() => {
    // Set formatted local time
    const formatCurrentDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setCurrentDate(new Date().toLocaleDateString('en-US', options));
    };
    formatCurrentDate();

    // Auto-scroll market tickers
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % marketTickers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const categories: Category[] = ['All', 'Politics', 'Technology', 'Business', 'Sports', 'Entertainment'];

  return (
    <header className="border-b border-gray-200 bg-white shadow-xs sticky top-0 z-50">
      {/* Top Banner Ticker / Utilities */}
      <div className="bg-neutral-900 text-white text-xs py-1.5 px-4 overflow-hidden hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Date & Time */}
          <div className="flex items-center space-x-2 text-neutral-300">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            <span>{currentDate}</span>
            <span className="text-neutral-500">|</span>
            <span className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-neutral-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>International Edition</span>
            </span>
          </div>

          {/* Market Ticker */}
          <div className="flex items-center space-x-4">
            <span className="text-neutral-400 font-medium tracking-wider flex items-center space-x-1 text-[10px]">
              <TrendingUp className="w-3 h-3 text-red-500" />
              <span>MARKET BRIEF:</span>
            </span>
            <div className="flex items-center space-x-2 transition-all duration-500 ease-in-out">
              <span className="font-semibold text-neutral-200">
                {marketTickers[tickerIndex].name}
              </span>
              <span className="text-neutral-300 font-mono">
                {marketTickers[tickerIndex].value}
              </span>
              <span
                className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                  marketTickers[tickerIndex].positive
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                    : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}
              >
                {marketTickers[tickerIndex].change}
              </span>
            </div>
          </div>

          {/* Breaking Alerts Notification Hook */}
          <div className="flex items-center space-x-1.5 text-neutral-300 hover:text-red-400 transition-colors cursor-pointer">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[11px] font-semibold">GNN Live Alerts</span>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Search */}
      <div className="bg-[#CC0000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* CNN Style Bold Branding Logo */}
          <div className="flex items-center space-x-4 cursor-pointer select-none" onClick={onGoHome}>
            <div className="bg-white text-[#CC0000] font-black text-3xl sm:text-4xl px-4 py-1.5 tracking-tighter rounded-xs shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              GNN
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white uppercase leading-none">
                Global News <span className="text-neutral-100 opacity-90">Network</span>
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-white/80 uppercase mt-1">
                Truth • Integrity • Journalism
              </p>
            </div>
          </div>

          {/* Interactive Search & Bookmarks */}
          <div className="flex items-center space-x-4 w-full md:w-auto max-w-md">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </span>
              <input
                type="text"
                className="block w-full pl-9 pr-8 py-2.5 border border-transparent rounded-md leading-5 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-white focus:border-white sm:text-sm transition-all shadow-inner"
                placeholder="Search global stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Bookmarks Toggle button */}
            <button
              onClick={onOpenBookmarks}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-md border border-white/20 text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition shadow-xs active:bg-white/30"
              title="Saved Bookmarks"
            >
              <Bookmark className="h-4 w-4 text-white fill-current" />
              <span className="hidden sm:inline">Bookmarks</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-[#CC0000] bg-white rounded-full ml-1">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-1 scrollbar-none">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSearchQuery(''); // Reset search when switching categories
                    setActiveCategory(category);
                  }}
                  className={`px-3 py-3 text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all whitespace-nowrap focus:outline-hidden relative ${
                    isActive
                      ? 'text-[#CC0000] border-b-3 border-[#CC0000]'
                      : 'text-neutral-600 hover:text-[#CC0000]'
                  }`}
                >
                  {category}
                  {category === 'Entertainment' && (
                    <span className="ml-1 px-1 py-0.2 bg-[#CC0000] text-[9px] text-white font-mono rounded animate-pulse">
                      Hot
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
