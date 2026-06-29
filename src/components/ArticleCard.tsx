import React from 'react';
import { Heart, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  key?: string | number;
  article: Article;
  onSelect: (article: Article) => void;
  isFeatured?: boolean;
}

export default function ArticleCard({ article, onSelect, isFeatured = false }: ArticleCardProps) {
  const isEntertainment = article.category === 'Entertainment';

  if (isFeatured) {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group relative cursor-pointer bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row h-full min-h-[420px] focus-within:ring-2 focus-within:ring-red-500"
        id={`article-featured-${article.id}`}
      >
        {/* Banner Image */}
        <div className="lg:w-3/5 overflow-hidden relative min-h-[250px] lg:min-h-full">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex space-x-2">
            <span className="bg-red-600 text-white font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm">
              {article.category}
            </span>
            {article.trending && (
              <span className="bg-neutral-900 text-yellow-400 font-extrabold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm flex items-center space-x-1">
                <span>🔥 Trending</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500">
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 group-hover:text-[#CC0000] transition-colors tracking-tight font-display leading-tight">
              {article.title}
            </h2>

            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-4">
              {article.subtitle}
            </p>

            {isEntertainment && (
              <div className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 rounded-md px-3 py-1.5 text-xs text-amber-800 font-bold">
                <span>Featured Entertainment Review Included</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-100 flex items-center justify-between mt-6 lg:mt-0">
            <span className="text-xs font-bold text-neutral-700">
              By <span className="text-neutral-900 underline decoration-red-500 decoration-2">{article.author}</span>
            </span>
            <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
              <span className="flex items-center space-x-1 hover:text-rose-600 transition-colors">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>{article.likes}</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>{article.comments.length}</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Grid Article Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-red-500"
      id={`article-card-${article.id}`}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex space-x-1.5">
          <span className="bg-neutral-900/90 text-white font-black text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-xs">
            {article.category}
          </span>
          {article.trending && (
            <span className="bg-yellow-400 text-neutral-950 font-black text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-xs shadow-xs">
              Trending
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug line-clamp-3 font-display">
            {article.title}
          </h3>

          <p className="text-neutral-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-600">
            By <span className="text-neutral-900">{article.author}</span>
          </span>
          <div className="flex items-center space-x-3 text-neutral-400 font-mono">
            <span className="flex items-center space-x-0.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>{article.likes}</span>
            </span>
            <span className="flex items-center space-x-0.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{article.comments.length}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
