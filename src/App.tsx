import React, { useState, useEffect } from 'react';
import { 
  mockArticles 
} from './data/newsData';
import { Article, Category } from './types';
import Header from './components/Header';
import BreakingNews from './components/BreakingNews';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';
import Footer from './components/Footer';
import BookmarksDrawer from './components/BookmarksDrawer';
import SEO from './components/SEO';
import { 
  CloudSun, ChevronRight, TrendingUp, HelpCircle, Flame, Sparkles, BookMarked, UserCheck 
} from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [tempArticles, setTempArticles] = useState<Article[]>(mockArticles);

  // Load Bookmarks on Mount
  useEffect(() => {
    const saved = localStorage.getItem('gnn_bookmarks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Article[];
        // Filter out any stale items, map IDs from mockArticles to prevent desync
        const activeSaved = mockArticles.filter(item => parsed.some(p => p.id === item.id));
        setSavedArticles(activeSaved);
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
  }, []);

  // Save Bookmarks on change
  const saveBookmarks = (newBookmarks: Article[]) => {
    setSavedArticles(newBookmarks);
    localStorage.setItem('gnn_bookmarks', JSON.stringify(newBookmarks));
  };

  const handleToggleBookmark = (article: Article) => {
    const exists = savedArticles.some(item => item.id === article.id);
    if (exists) {
      const filtered = savedArticles.filter(item => item.id !== article.id);
      saveBookmarks(filtered);
    } else {
      const updated = [...savedArticles, article];
      saveBookmarks(updated);
    }
  };

  const isBookmarked = (article: Article) => {
    return savedArticles.some(item => item.id === article.id);
  };

  // Filter Articles based on category AND search input
  const filteredArticles = tempArticles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.seoKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Identify featured story (usually the first featured or trending story in the filtered array)
  const featuredStory = filteredArticles.find(article => article.featured) || filteredArticles[0];
  const gridStories = filteredArticles.filter(article => article.id !== (featuredStory?.id || ''));

  // Opinion columns simulated for CNN editorial depth
  const opinionColumns = [
    {
      id: 'op-1',
      author: 'David Brooks',
      role: 'Global Affairs Columnist',
      title: 'Why the Geneva Green Grid Accord Marks the Real End of Energy Isolationism',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 'op-2',
      author: 'Patricia Vance',
      role: 'Tech Ethics Council Director',
      title: 'Neural Implants: Balancing Tremendous Medical Hope Against Massive Privacy Pitfalls',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop'
    }
  ];

  // Dynamic Weather widget metrics
  const mockWeather = {
    temp: '78°F',
    condition: 'Partly Sunny',
    city: 'New York, US',
    humidity: '54%',
    wind: '9 mph'
  };

  // Determine metadata values for SEO based on active screen
  const seoTitle = selectedArticle 
    ? selectedArticle.title 
    : activeCategory === 'All' 
      ? 'Global Breaking News, Politics, Tech & Business' 
      : `${activeCategory} Category Latest Reports`;

  const seoDescription = selectedArticle 
    ? selectedArticle.subtitle 
    : `Read the latest breaking ${activeCategory.toLowerCase()} news, deep essays, visual articles, and expert opinions on Global News Network.`;

  const seoKeywords = selectedArticle 
    ? selectedArticle.seoKeywords 
    : ['Global News Network', 'GNN', 'Breaking News', 'Latest Politics', 'Tech breakthroughs', 'Business trends', 'Sports results', 'Entertainment reviews'];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800 font-sans selection:bg-red-600 selection:text-white">
      
      {/* SEO Dynamic Injection Engine */}
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        slug={selectedArticle?.slug}
        article={selectedArticle || undefined}
      />

      {/* GNN Top Navigation Header */}
      <Header 
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedArticle(null); // Go back to feed when changing category
        }}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          if (selectedArticle) setSelectedArticle(null); // Return to list during searches
        }}
        savedCount={savedArticles.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onGoHome={() => {
          setActiveCategory('All');
          setSearchQuery('');
          setSelectedArticle(null);
        }}
      />

      {/* Breaking News Ribbon Alert */}
      <BreakingNews />

      {/* Main Content Layout */}
      <main className="flex-1 pb-12">
        {selectedArticle ? (
          // DETAILED READER VIEW
          <ArticleView 
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onSelectArticle={(art) => setSelectedArticle(art)}
            relatedArticles={tempArticles.filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id)}
            isBookmarked={isBookmarked(selectedArticle)}
            onToggleBookmark={() => handleToggleBookmark(selectedArticle)}
          />
        ) : (
          // FEED VIEW (CNN Editorial Structure)
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            
            {/* Search results banner if searching */}
            {searchQuery && (
              <div className="bg-white border border-neutral-200 rounded-lg p-5 flex justify-between items-center shadow-xs">
                <div>
                  <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Search Query Feed</h2>
                  <p className="text-xl font-black text-neutral-950 mt-1">
                    Found {filteredArticles.length} stories matching "{searchQuery}"
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-2 px-3.5 rounded-md transition"
                >
                  Clear Search
                </button>
              </div>
            )}

            {filteredArticles.length === 0 ? (
              // Empty Feed State
              <div className="bg-white border border-neutral-200 rounded-lg py-16 px-4 text-center max-w-xl mx-auto space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-neutral-900">No Articles Match Your Search</h3>
                  <p className="text-sm text-neutral-500">
                    We couldn't find any press wire logs matching those keywords. Try refining your spelling or look in other categories.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-4 py-2 bg-neutral-950 text-white rounded-md text-xs font-bold hover:bg-red-600 transition"
                >
                  Reset News Feed
                </button>
              </div>
            ) : (
              // EDITORIAL GRID
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Dynamic Editorial Block (9 of 12 columns) */}
                <section className="lg:col-span-9 space-y-8" id="gnn-editorial-news-feed">
                  
                  {/* Category Title Header banner */}
                  <div className="border-b-3 border-[#CC0000] pb-2 flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-950 tracking-tight flex items-center space-x-2 font-display">
                      <span className="bg-[#CC0000] w-3 h-6 inline-block"></span>
                      <span>{activeCategory === 'All' ? 'Top Stories & Coverage' : `${activeCategory} News`}</span>
                    </h2>
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      LIVE PRESS FEEDS • {filteredArticles.length} STORIES AVAILABLE
                    </span>
                  </div>

                  {/* HERO ARTICLE (Featured Banner) */}
                  {!searchQuery && featuredStory && (
                    <div className="mb-8">
                      <ArticleCard 
                        article={featuredStory} 
                        onSelect={(art) => setSelectedArticle(art)} 
                        isFeatured={true}
                      />
                    </div>
                  )}

                  {/* SECONDARY STORIES GRID */}
                  <div>
                    {gridStories.length > 0 && (
                      <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4">
                        Additional Coverage
                      </h3>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {gridStories.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelect={(art) => setSelectedArticle(art)}
                        />
                      ))}
                    </div>
                  </div>

                </section>

                {/* Right Side: News Widgets Rail (3 of 12 columns) */}
                <aside className="lg:col-span-3 space-y-6">
                  
                  {/* Weather Widget (Authentic News Feel) */}
                  <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                      <span className="text-xs font-black text-neutral-400 font-display tracking-widest">GNN WEATHER REPORT</span>
                      <CloudSun className="w-5 h-5 text-red-500 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">{mockWeather.city}</h4>
                        <p className="text-xs text-neutral-500">{mockWeather.condition}</p>
                      </div>
                      <span className="text-3xl font-black text-neutral-950">{mockWeather.temp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-50/50 text-[11px] font-mono text-neutral-500">
                      <div>Humidity: <span className="font-bold text-neutral-800">{mockWeather.humidity}</span></div>
                      <div>Wind Speed: <span className="font-bold text-neutral-800">{mockWeather.wind}</span></div>
                    </div>
                  </div>

                  {/* Editors Pick / Live Winbox Promotion Callout */}
                  <div className="bg-linear-to-br from-[#CC0000] to-[#990000] rounded-lg p-5 text-white space-y-4 shadow-xs relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
                    
                    <div className="relative space-y-4">
                      <span className="bg-neutral-900 text-white font-mono font-black text-[9px] tracking-wider px-2 py-0.5 rounded-sm uppercase">
                        Editor's Recommendation
                      </span>
                      <h4 className="text-base font-black tracking-tight leading-snug font-display">
                        Discover the Gaming World with Winbox Premium
                      </h4>
                      <p className="text-white/85 text-xs leading-relaxed">
                        Read verified reviews on safe downloadable apps, real-time dealer interfaces, and sports forecasts at the official site <a href="https://winbox666.com" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-neutral-200">winbox666.com</a> or the mirror interface <a href="https://winbox666.online" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-neutral-200">winbox666.online</a>.
                      </p>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            // Automatically jump to the Entertainment Category to see the main articles!
                            setActiveCategory('Entertainment');
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className="w-full text-center bg-neutral-950 hover:bg-neutral-900 text-white hover:text-white text-xs font-bold py-2 px-3 rounded-md transition shadow-sm flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <span>Read Winbox Coverage</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trending Topics Index */}
                  <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4 shadow-xs">
                    <div className="flex items-center space-x-1.5 border-b border-neutral-100 pb-2">
                      <Flame className="w-4.5 h-4.5 text-red-600 fill-current" />
                      <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest font-display">HOT TOPICS INDEX</h4>
                    </div>
                    
                    <ol className="space-y-3.5 text-xs font-semibold">
                      <li className="flex space-x-3 items-start group cursor-pointer" onClick={() => {
                        const art = tempArticles.find(a => a.id === 'ent-1');
                        if (art) setSelectedArticle(art);
                      }}>
                        <span className="font-mono text-lg font-black text-red-500 leading-none">01</span>
                        <span className="text-neutral-800 group-hover:text-red-600 transition-colors">
                          Mobile Gaming and Casino Hubs Reach All-Time High Usage in 2026.
                        </span>
                      </li>
                      <li className="flex space-x-3 items-start group cursor-pointer" onClick={() => {
                        const art = tempArticles.find(a => a.id === 'pol-1');
                        if (art) setSelectedArticle(art);
                      }}>
                        <span className="font-mono text-lg font-black text-neutral-400 leading-none">02</span>
                        <span className="text-neutral-800 group-hover:text-red-600 transition-colors">
                          Geneva grid summit confirms $1.2 Trillion clean energy funding milestones.
                        </span>
                      </li>
                      <li className="flex space-x-3 items-start group cursor-pointer" onClick={() => {
                        const art = tempArticles.find(a => a.id === 'tech-1');
                        if (art) setSelectedArticle(art);
                      }}>
                        <span className="font-mono text-lg font-black text-neutral-400 leading-none">03</span>
                        <span className="text-neutral-800 group-hover:text-red-600 transition-colors">
                          Bionic brain implants and neural telemetry interfaces enter MIT clinical trials.
                        </span>
                      </li>
                    </ol>
                  </div>

                  {/* Opinion Columns Block */}
                  <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4 shadow-xs">
                    <div className="border-b border-neutral-100 pb-2">
                      <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest font-display">EDITORIAL & OPINION</h4>
                    </div>

                    <div className="space-y-4">
                      {opinionColumns.map((col) => (
                        <div key={col.id} className="space-y-2 group cursor-pointer">
                          <h5 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                            "{col.title}"
                          </h5>
                          <div className="flex items-center space-x-2">
                            <img 
                              src={col.avatar} 
                              alt={col.author} 
                              referrerPolicy="no-referrer"
                              className="w-5.5 h-5.5 rounded-full object-cover bg-neutral-100" 
                            />
                            <div>
                              <p className="text-[10px] font-bold text-neutral-800 leading-none">{col.author}</p>
                              <p className="text-[9px] text-neutral-500 mt-0.5 leading-none">{col.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </aside>

              </div>
            )}

          </div>
        )}
      </main>

      {/* Sitewide Footer Navigation */}
      <Footer 
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Bookmarks Drawer Modal Overlay */}
      <BookmarksDrawer 
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        savedArticles={savedArticles}
        onRemoveBookmark={(art) => handleToggleBookmark(art)}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

    </div>
  );
}
