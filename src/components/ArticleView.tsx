import { useState, useEffect, FormEvent } from 'react';
import { 
  Heart, MessageSquare, Clock, ArrowLeft, Bookmark, Share2, 
  Copy, Check, Send, Sparkles, ChevronRight, User, Plus, Minus, ThumbsUp 
} from 'lucide-react';
import { Article, Comment } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ArticleView({
  article,
  onBack,
  onSelectArticle,
  relatedArticles,
  isBookmarked,
  onToggleBookmark,
}: ArticleViewProps) {
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(article.comments);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [fontSize, setFontSize] = useState<number>(16); // px
  const [copied, setCopied] = useState(false);

  // Sync likes and comments if article changes
  useEffect(() => {
    setLikes(article.likes);
    setHasLiked(false);
    setComments(article.comments);
  }, [article]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `new-comment-${Date.now()}`,
      author: commentName.trim(),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 99999)}?q=80&w=100&auto=format&fit=crop`,
      content: commentText.trim(),
      timestamp: 'Just now',
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentName('');
    setCommentText('');
  };

  const copyToClipboard = () => {
    const fakeUrl = `${window.location.origin}/article/${article.slug}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Helper to dynamically parse links inside paragraphs for SEO anchor optimization
  const parseParagraphText = (text: string) => {
    // Regex matches the two required domains exactly
    const urlRegex = /(https:\/\/winbox666\.(?:com|online))/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-extrabold hover:text-red-700 underline decoration-2 decoration-red-600/50 hover:decoration-red-700 transition-all inline-flex items-center space-x-1 hover:scale-101 transform origin-left"
          >
            <span>{part}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse inline ml-1" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-neutral-500 mb-6 bg-neutral-50 px-3 py-2 rounded-md">
        <button onClick={onBack} className="hover:text-red-600 transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="text-neutral-400 uppercase font-bold text-[10px] tracking-wider">{article.category}</span>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="text-neutral-700 font-medium truncate max-w-xs sm:max-w-md">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Article Content Panel (Left/Middle 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Back button and quick actions panel */}
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-neutral-600 hover:text-red-600 font-bold transition-colors cursor-pointer text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Global Feed</span>
            </button>

            {/* Accessibility / Bookmark Tools */}
            <div className="flex items-center space-x-4">
              {/* Font Size Adjusters */}
              <div className="flex items-center space-x-1.5 bg-neutral-100 rounded-lg p-0.5" title="Adjust text size">
                <button 
                  onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                  className="p-1 rounded-md text-neutral-600 hover:bg-white hover:text-neutral-900 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono font-bold text-neutral-700 px-1 select-none">A</span>
                <button 
                  onClick={() => setFontSize(prev => Math.min(22, prev + 2))}
                  className="p-1 rounded-md text-neutral-600 hover:bg-white hover:text-neutral-900 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={onToggleBookmark}
                className={`p-1.5 rounded-lg border transition ${
                  isBookmarked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
                }`}
                title={isBookmarked ? "Remove from bookmarks" : "Save for offline reading"}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Heading Area */}
          <header className="space-y-4">
            <span className="bg-red-600 text-white font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-xs">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 font-display tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-sans">
              {article.subtitle}
            </p>

            {/* Author Credit */}
            <div className="flex flex-wrap items-center justify-between pt-4 pb-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{article.author}</h4>
                  <p className="text-xs text-neutral-500 font-mono">GNN Senior Editorial Staff</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
                <span>{article.date}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </div>
          </header>

          {/* Main Hero Image */}
          <div className="relative rounded-lg overflow-hidden border border-neutral-200 shadow-xs max-h-[480px]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-neutral-900/70 to-transparent p-4">
              <p className="text-xs text-neutral-200 italic font-medium">GNN Newsroom — Certified Media Broadcast coverage</p>
            </div>
          </div>

          {/* Social Share Ribbon */}
          <div className="flex flex-wrap items-center justify-between py-3 border-y border-neutral-100 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-neutral-500 flex items-center space-x-1">
                <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>SHARE STORY:</span>
              </span>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition text-xs font-medium cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Likes count interactive controller */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold transition border cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-rose-500' : ''}`} />
              <span>{likes} Likes</span>
            </button>
          </div>

          {/* Article Editorial Body */}
          <div 
            className="prose max-w-none text-neutral-800 leading-relaxed space-y-6 font-sans select-text"
            style={{ fontSize: `${fontSize}px` }}
          >
            {article.content.map((paragraph, index) => {
              // Add a nice Dropcap to first paragraph for style!
              if (index === 0) {
                return (
                  <p key={index} className="first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                    {parseParagraphText(paragraph)}
                  </p>
                );
              }
              return (
                <p key={index}>
                  {parseParagraphText(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Special Promotional CTA widget if it's the Entertainment category promoting Winbox */}
          {article.category === 'Entertainment' && (
            <div className="bg-linear-to-br from-neutral-900 via-neutral-900 to-red-950 text-white rounded-xl p-6 sm:p-8 border border-red-900/50 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-amber-500 text-neutral-950 font-black text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider animate-pulse">
                    Exclusive Hub
                  </div>
                  <span className="text-neutral-400 font-mono text-xs">Recommended Entertainment</span>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Discover Trusted Gaming & Entertainment on <span className="text-red-500">Winbox</span>
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Join the ultimate entertainment experience. Grab secure, official downloads and mirror signups safely. Winbox offers top security protocols, licensed random-number generator configurations, and dynamic VIP loyalty programs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="https://winbox666.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-center font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center space-x-2 text-sm border border-red-500 cursor-pointer"
                >
                  <span>Go to Winbox666 Official</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="https://winbox666.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent hover:bg-neutral-800 text-white hover:text-white text-center font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 text-sm border border-neutral-700 hover:border-neutral-600 cursor-pointer"
                >
                  <span>Winbox Web Mirror Register</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </a>
              </div>

              <div className="pt-2 text-center text-[10px] text-neutral-400 font-mono">
                Please play responsibly. Secure connections verified by GNN Tech Labs.
              </div>
            </div>
          )}

          {/* Dynamic Interactive Comments Panel */}
          <div className="pt-8 border-t border-neutral-200 space-y-6">
            <h3 className="text-xl font-bold text-neutral-900 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <span>Comments ({comments.length})</span>
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="bg-neutral-50 rounded-lg p-4 border border-neutral-200/80 space-y-4">
              <h4 className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Join the Conversation</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="comm-name" className="sr-only">Your Name</label>
                  <input
                    type="text"
                    id="comm-name"
                    placeholder="Your Name (Required)"
                    className="block w-full rounded-md border-neutral-300 px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 border focus:outline-hidden"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="comm-text" className="sr-only">Comment Content</label>
                <textarea
                  rows={3}
                  id="comm-text"
                  placeholder="Share your thoughts on this story..."
                  className="block w-full rounded-md border-neutral-300 px-3 py-2 text-sm bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 border focus:outline-hidden"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-md text-xs font-bold hover:bg-red-600 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* List of Comments */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-neutral-500 text-sm py-4 italic text-center">No comments posted yet. Be the first to join the debate!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-4 bg-white rounded-lg border border-neutral-100 shadow-2xs hover:shadow-xs transition">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author} 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover bg-neutral-100" 
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-950">{comment.author}</h4>
                        <span className="text-[10px] text-neutral-400 font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">{comment.content}</p>
                      
                      <div className="flex items-center space-x-2 pt-2 text-[10px] text-neutral-400 font-mono">
                        <button className="hover:text-red-600 flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful</span>
                        </button>
                        <span>•</span>
                        <button className="hover:text-neutral-600">Reply</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets (Right 1 Column) */}
        <div className="space-y-6">
          
          {/* SEO Highlight Widget */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-5 space-y-4">
            <h4 className="text-xs font-black text-red-700 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>GNN Fact Check</span>
            </h4>
            <div className="space-y-2">
              <p className="text-xs font-bold text-neutral-800">Verified Journalism</p>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Our editorial teams cross-reference all digital sources with strict standards before printing. This article is licensed for dynamic redistribution.
              </p>
            </div>
            
            <div className="border-t border-red-200/50 pt-3">
              <div className="flex flex-wrap gap-1.5">
                {article.seoKeywords.map((kw, i) => (
                  <span key={i} className="text-[9px] font-mono font-bold bg-white text-red-700 border border-red-200 px-2 py-0.5 rounded-sm">
                    #{kw.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related/Latest Stories */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-neutral-950 uppercase tracking-tight border-l-4 border-red-600 pl-3">
              Related Stories
            </h3>
            
            <div className="space-y-4">
              {relatedArticles.length === 0 ? (
                <p className="text-neutral-500 text-xs italic">No related articles found.</p>
              ) : (
                relatedArticles.slice(0, 4).map((related) => (
                  <div
                    key={related.id}
                    onClick={() => onSelectArticle(related)}
                    className="group cursor-pointer flex space-x-3 items-center p-2 rounded-lg hover:bg-neutral-50 transition border border-transparent hover:border-neutral-100"
                  >
                    <img
                      src={related.image}
                      alt={related.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-neutral-100"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-red-600 uppercase">
                        {related.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                        {related.title}
                      </h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Interactive Entertainment / Winbox promotional Banner inside right rail */}
          {article.category !== 'Entertainment' && (
            <div className="bg-linear-to-br from-neutral-950 to-neutral-900 border border-neutral-800 rounded-lg p-5 text-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold bg-amber-500 text-neutral-950 px-2 py-0.5 rounded-xs">
                  PROMOTION
                </span>
                <span className="text-neutral-500 text-[10px]">Winbox Global</span>
              </div>
              <h4 className="text-sm font-extrabold text-white leading-snug">
                Trending: Secure Mobile Amusement & Live Lobby Gateway
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Connect safely with registered and licensed casual gaming apps. Explore top-tier VIP prizes at <a href="https://winbox666.com" target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline">winbox666.com</a> or the web portal <a href="https://winbox666.online" target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline">winbox666.online</a>.
              </p>
              <div className="pt-2">
                <a
                  href="https://winbox666.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs bg-red-600 text-white hover:text-white font-extrabold py-2 px-3 rounded-md shadow-xs transition hover:bg-red-700"
                >
                  Visit Winbox Download Portal
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
