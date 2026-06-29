export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  trending?: boolean;
  featured?: boolean;
  likes: number;
  comments: Comment[];
  seoKeywords: string[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export type Category = 'All' | 'Politics' | 'Technology' | 'Business' | 'Sports' | 'Entertainment';
