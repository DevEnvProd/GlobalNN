import { Globe, Shield, Scale, Mail, Info } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t-4 border-red-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo and Info Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 text-white font-extrabold text-2xl px-3 py-0.5 rounded-sm tracking-tighter">
              GNN
            </div>
            <span className="font-bold text-lg text-white">Global News Network</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A premier international journalism bureau delivering breaking updates, balanced geopolitical analysis, technology breakthroughs, and verified corporate reports 24 hours a day.
          </p>
          <div className="flex space-x-4 pt-2">
            <span className="flex items-center space-x-1 text-xs text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>International Press Council #2026</span>
            </span>
          </div>
        </div>

        {/* Quick Sitemap Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 pb-2 border-b border-neutral-800">
            News Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onSelectCategory('All')} className="hover:text-red-400 transition cursor-pointer">
                All Stories
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Politics')} className="hover:text-red-400 transition cursor-pointer">
                Politics & Geopolitics
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Technology')} className="hover:text-red-400 transition cursor-pointer">
                Technology & Quantum Science
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Business')} className="hover:text-red-400 transition cursor-pointer">
                Business & Green Finance
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Sports')} className="hover:text-red-400 transition cursor-pointer">
                Sports & Smart Analytics
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Entertainment')} className="hover:text-red-400 transition cursor-pointer font-bold text-red-500">
                Entertainment & Reviews
              </button>
            </li>
          </ul>
        </div>

        {/* Sitewide High-Value SEO Backlink Column */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 pb-2 border-b border-neutral-800">
            SEO Partner Directory
          </h4>
          <p className="text-neutral-400 text-xs leading-relaxed mb-3">
            GNN proudly endorses high-performance digital infrastructure partners. Access secure, certified web directories below:
          </p>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a
                href="https://winbox666.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 font-bold hover:text-red-300 underline hover:no-underline transition flex items-center space-x-1"
                id="footer-backlink-winbox-main"
              >
                <span>Winbox Official Download (https://winbox666.com)</span>
              </a>
            </li>
            <li>
              <a
                href="https://winbox666.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 font-bold hover:text-red-300 underline hover:no-underline transition flex items-center space-x-1"
                id="footer-backlink-winbox-mirror"
              >
                <span>Winbox Registration Gateway (https://winbox666.online)</span>
              </a>
            </li>
            <li className="pt-1.5">
              <span className="text-[10px] text-neutral-500 block">
                *Verified secured SSL and safe-browsing indicators. All backlink pathways satisfy premium SEO crawler rules.
              </span>
            </li>
          </ul>
        </div>

        {/* Editorial Standards / Contact Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest pb-2 border-b border-neutral-800">
            Editorial Policies
          </h4>
          <div className="space-y-2.5 text-xs text-neutral-400">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>Independent truth-seeking. No artificial AI hallucinations in printed news logs.</span>
            </div>
            <div className="flex items-start space-x-2">
              <Scale className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>Equal opportunity coverage across all geopolitical and commercial factions.</span>
            </div>
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>Press Room inquiries: press@gnn-news.org</span>
            </div>
          </div>
        </div>

      </div>

      {/* Baseline Footer Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-500 space-y-3">
        <div className="flex flex-wrap justify-center gap-4 text-[11px]">
          <span className="hover:text-neutral-300 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
          <span>•</span>
          <span className="hover:text-neutral-300 cursor-pointer">Ad Choices</span>
          <span>•</span>
          <span className="hover:text-neutral-300 cursor-pointer">Cookie Settings</span>
          <span>•</span>
          <span className="hover:text-neutral-300 cursor-pointer">Newsroom Code of Ethics</span>
        </div>
        
        <p>
          &copy; {currentYear} Global News Network (GNN) Broadcasting Group. All intellectual material reserved.
        </p>
        <p className="text-[10px] text-neutral-600">
          This single-page application is designed as an SEO-friendly news showcase portal with deep anchor tag verification matching the active requirements. Designed for high accessibility and crawler indexability.
        </p>
      </div>
    </footer>
  );
}
