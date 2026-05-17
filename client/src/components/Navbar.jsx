import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LayoutDashboard, 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('teyzix-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('teyzix-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Internships', path: '/internships' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">TEYZIX</span>
              <span className="text-xl font-light text-blue-600">CORE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-sm font-bold transition-colors ${
                    location.pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link 
                to="/admin" 
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                <LayoutDashboard size={18} />
                Admin
              </Link>

              <Link to="/apply" className="btn-primary py-2 px-5 text-sm">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-600 dark:text-slate-400"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-slate-900 dark:text-white py-2 border-b border-slate-50 dark:border-slate-900"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-4 bg-slate-100 dark:bg-slate-900 rounded-xl font-bold"
                >
                  <LayoutDashboard size={20} />
                  Admin Dashboard
                </Link>
                <Link 
                  to="/apply" 
                  onClick={() => setIsOpen(false)}
                  className="btn-primary py-4"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
