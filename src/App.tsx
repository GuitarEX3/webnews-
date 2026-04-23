/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Bell, 
  TrendingUp, 
  Clock, 
  Share2, 
  ChevronRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Moon,
  Sun,
  X,
  Newspaper,
  Laugh,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS_DATA, type NewsPost, type Category } from './constants';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const categories = ['Home', 'News', 'Trending', 'Funny', 'Videos', 'About'];

  const filteredPosts = NEWS_DATA.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeCategory === 'Home') return true;
    if (activeCategory === 'News') return post.category === 'News';
    if (activeCategory === 'Trending') return post.category === 'Trending' || post.category === 'Viral';
    if (activeCategory === 'Funny') return post.category === 'Funny';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-brand-navy dark:bg-slate-900 h-16 flex items-center shadow-lg transition-all border-b border-white/10">
        <div className="container mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveCategory('Home')}>
            <div className="text-white font-extrabold text-2xl tracking-tight">
              INSIGHT<span className="text-brand-yellow">SMILE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-1 py-1 text-sm font-semibold transition-colors ${
                  activeCategory === cat 
                    ? 'text-white border-b-2 border-brand-yellow' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-1.5 focus-within:ring-2 ring-brand-yellow/30 transition-all">
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:ring-0 text-sm px-2 w-32 lg:w-48 outline-none text-white placeholder:text-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              className="lg:hidden p-2 rounded-full hover:bg-white/10 text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-slate-900 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b dark:border-slate-800">
                <span className="font-display font-bold text-xl text-brand-navy dark:text-white">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-4 text-xl font-bold border-b border-gray-50 dark:border-slate-800 ${
                      activeCategory === cat ? 'text-brand-yellow' : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <div className="container mx-auto px-8 py-8">
          
          {/* Hero Section */}
          {activeCategory === 'Home' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2 group cursor-pointer">
                <div className="relative overflow-hidden rounded-[16px] aspect-[16/9] shadow-sleek hover:shadow-lg transition-all duration-500 bg-white dark:bg-slate-900">
                  <img 
                    src={NEWS_DATA[0].image} 
                    alt={NEWS_DATA[0].title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="sleek-badge bg-brand-navy text-white mb-4 inline-block">
                      Breaking News
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      {NEWS_DATA[0].title}
                    </h2>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
                      {NEWS_DATA[0].description}
                    </p>
                    <div className="flex items-center text-[11px] text-white/60 font-bold uppercase tracking-wider gap-4">
                      <span>{NEWS_DATA[0].author}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                      <span>{NEWS_DATA[0].date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <aside className="flex flex-col gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 shadow-sidebar">
                  <div className="flex items-center gap-3 mb-5 group">
                    <h3 className="font-bold text-base text-brand-navy dark:text-white whitespace-nowrap">Trending Now</h3>
                    <div className="h-px bg-gray-100 dark:bg-slate-800 flex-1"></div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {NEWS_DATA.slice(1, 4).map((post) => (
                      <div 
                        key={post.id} 
                        className="flex gap-3 cursor-pointer group"
                      >
                        <div className="w-[60px] h-[60px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-[13px] text-brand-text dark:text-gray-200 line-clamp-2 leading-snug group-hover:text-brand-navy dark:group-hover:text-brand-yellow transition-colors">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 shadow-sidebar">
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="font-bold text-base text-brand-navy dark:text-white whitespace-nowrap overflow-hidden">Viral of the Week</h3>
                    <div className="h-px bg-gray-100 dark:bg-slate-800 flex-1"></div>
                  </div>
                  <div className="text-center p-4 bg-brand-bg dark:bg-slate-800 rounded-[8px] italic text-[13px] text-brand-navy dark:text-brand-yellow font-medium leading-relaxed">
                    "ถ้าความรักคือการเรียนรู้ การอยู่คนเดียวคือการพักผ่อน"
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('Home')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'Home' 
                  ? 'bg-brand-navy text-white' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-100 border dark:border-slate-800'
              }`}
            >
              All Stories
            </button>
            <button 
              onClick={() => setActiveCategory('News')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'News' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-100 border dark:border-slate-800'
              }`}
            >
              <Newspaper className="w-4 h-4" /> Serious News
            </button>
            <button 
              onClick={() => setActiveCategory('Funny')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'Funny' 
                  ? 'bg-brand-yellow text-brand-navy shadow-lg shadow-yellow-500/20' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-100 border dark:border-slate-800'
              }`}
            >
              <Laugh className="w-4 h-4" /> Funny / Memes
            </button>
            <button 
              onClick={() => setActiveCategory('Trending')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === 'Trending' 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-100 border dark:border-slate-800'
              }`}
            >
              <Flame className="w-4 h-4" /> Burning Viral
            </button>
          </div>

          {/* Main Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`sleek-card flex flex-col h-full overflow-hidden ${
                    post.category === 'Funny' ? 'sleek-card-funny' : 'sleek-card-news'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`sleek-badge shadow-md border border-white/20 ${
                        post.category === 'News' ? 'bg-brand-navy text-white' : 'bg-brand-yellow text-brand-navy'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-base mb-2 text-brand-text dark:text-white group-hover:text-brand-navy dark:group-hover:text-brand-yellow transition-colors line-clamp-2 leading-relaxed">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-[13px] line-clamp-3 mb-6 leading-relaxed">
                      {post.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center pb-12">
            <button className="px-10 py-3 bg-brand-navy text-white rounded-[8px] text-[13px] font-bold hover:bg-brand-yellow hover:text-brand-navy transition-all shadow-md">
              LOAD MORE STORIES
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 h-16 flex items-center shadow-inner">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>LIVE: UPDATES 24/7 • &copy; 2026 INSIGHTSMILE NEWS AGENCY</span>
          </div>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-navy dark:hover:text-brand-yellow transition-colors">Facebook</a>
            <a href="#" className="hover:text-brand-navy dark:hover:text-brand-yellow transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-navy dark:hover:text-brand-yellow transition-colors">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
