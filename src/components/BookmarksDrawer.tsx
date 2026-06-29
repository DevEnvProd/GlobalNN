import { X, Trash2, Bookmark, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onRemoveBookmark: (article: Article) => void;
  onSelectArticle: (article: Article) => void;
}

export default function BookmarksDrawer({
  isOpen,
  onClose,
  savedArticles,
  onRemoveBookmark,
  onSelectArticle,
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="bookmarks-panel">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-neutral-200">
          
          {/* Header */}
          <div className="px-6 py-5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-red-600 fill-current" />
              <h2 className="text-lg font-extrabold text-neutral-900 uppercase tracking-wide">Saved Bookmarks</h2>
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-neutral-900 text-white rounded-full">
                {savedArticles.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookmarks List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <Bookmark className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="font-bold text-neutral-900">No saved stories</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Tap the bookmark icon on any article card or reader page to save it for offline reference.
                  </p>
                </div>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col p-4 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-red-200 transition-all relative group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-xs uppercase">
                      {article.category}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(article)}
                      className="text-neutral-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="text-sm font-bold text-neutral-950 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>By {article.author}</span>
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="text-red-600 hover:text-red-700 font-bold flex items-center space-x-0.5 transition-colors"
                    >
                      <span>Read</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of bookmarks */}
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 font-mono text-center">
            Saved items persist locally inside your browser cache.
          </div>
        </div>
      </div>
    </div>
  );
}
