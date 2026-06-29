import { useEffect } from 'react';
import { Article } from '../types';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  slug?: string;
  article?: Article;
}

export default function SEO({ title, description, keywords, slug, article }: SEOProps) {
  useEffect(() => {
    // 1. Dynamic document title
    const fullTitle = `${title} | Global News Network`;
    document.title = fullTitle;

    // Helper to set or update meta tag
    const updateMetaTag = (name: string, value: string, isProperty: boolean = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Set description & keywords
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', article ? article.author : 'Global News Network');
    updateMetaTag('robots', 'index, follow');

    // 3. OpenGraph tags (for Social Sharing SEO)
    const currentUrl = slug 
      ? `https://globalnewsnetwork.live/article/${slug}` 
      : 'https://globalnewsnetwork.live';
    
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', article ? 'article' : 'website', true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', article ? article.image : 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=800', true);
    updateMetaTag('og:site_name', 'Global News Network', true);

    // 4. Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', article ? article.image : 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=800');

    // 5. Schema.org JSON-LD (Search Engine Rich Snippet)
    let jsonLdData: any = {};

    if (article) {
      jsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': currentUrl,
        },
        'headline': article.title,
        'description': article.subtitle,
        'image': [article.image],
        'datePublished': new Date(article.date).toISOString(),
        'dateModified': new Date(article.date).toISOString(),
        'author': {
          '@type': 'Person',
          'name': article.author,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Global News Network',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://globalnewsnetwork.live/logo.png',
          },
        },
      };
    } else {
      jsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Global News Network',
        'url': 'https://globalnewsnetwork.live',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://globalnewsnetwork.live/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };
    }

    // Inject Script block
    let scriptTag = document.getElementById('seo-json-ld') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-json-ld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(jsonLdData);

    // Cleanup when component unmounts
    return () => {
      // Keep title and essential tags but clean up structured schema if navigating
      if (scriptTag) {
        scriptTag.text = '';
      }
    };
  }, [title, description, keywords, slug, article]);

  return null; // This is a utility meta-injector component, renders nothing visibly
}
