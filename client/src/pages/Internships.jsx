import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Bookmark,
  Share2,
  Calendar,
  X,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const internships = [
    {
      id: 1,
      title: 'Senior Web Development Intern',
      company: 'Teyzix Core',
      location: 'Remote',
      duration: '3 Months',
      stipend: '$500 - $800',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'Tailwind CSS'],
      positions: 5,
      deadline: '2026-06-15',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'AI & Machine Learning Engineer',
      company: 'DataFlow Systems',
      location: 'Hybrid',
      duration: '6 Months',
      stipend: '$700 - $1000',
      category: 'AI & Machine Learning',
      skills: ['Python', 'TensorFlow', 'NLP'],
      positions: 3,
      deadline: '2026-06-10',
      type: 'Part-time',
    },
    {
      id: 3,
      title: 'UI/UX Product Designer',
      company: 'Creative Studio',
      location: 'Remote',
      duration: '4 Months',
      stipend: '$400 - $600',
      category: 'UI/UX Design',
      skills: ['Figma', 'Framer', 'Prototyping'],
      positions: 2,
      deadline: '2026-06-20',
      type: 'Contract',
    },
    {
      id: 4,
      title: 'Cybersecurity Analyst',
      company: 'SecureNet Inc',
      location: 'On-site',
      duration: '3 Months',
      stipend: '$600 - $900',
      category: 'Cybersecurity',
      skills: ['Network Security', 'Pen Testing', 'Ethical Hacking'],
      positions: 4,
      deadline: '2026-07-01',
      type: 'Full-time',
    }
  ];

  const categories = ['All', 'Web Development', 'AI & Machine Learning', 'UI/UX Design', 'Cybersecurity', 'Cloud Computing', 'Mobile App Development'];

  const filteredInternships = internships.filter(intern => {
    const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         intern.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || intern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Professional Internships</h1>
          <p className="text-slate-500 dark:text-slate-400">Discover your next career milestone from our curated list of industry opportunities.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 space-y-8">
            <div className="card-premium !p-0 overflow-hidden">
              <div className="bg-slate-900 p-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Filter size={18} className="text-blue-500" />
                  Search Filters
                </h3>
              </div>
              <div className="p-6 space-y-8">
                {/* Search */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Search Keywords</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Title, company..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Categories</label>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedCategory === cat 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                            : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && <CheckCircle2 size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Job Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Full-time', 'Part-time', 'Remote', 'On-site'].map(tag => (
                      <button key={tag} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-blue-600 transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <h4 className="text-xl font-black mb-4">Want specialized guidance?</h4>
              <p className="text-blue-100 text-sm mb-6 font-medium">Join our Mentorship program to get 1-on-1 assistance.</p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all">
                Learn More
              </button>
            </div>
          </aside>

          {/* Internship Feed */}
          <main className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold text-slate-500">
                Showing <span className="text-slate-900 dark:text-white font-black">{filteredInternships.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                <button className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                  Newest First
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredInternships.map((intern) => (
                <motion.div
                  key={intern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-premium group"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-6">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400">
                        <Briefcase size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge badge-blue">{intern.category}</span>
                          <span className="badge badge-amber">{intern.type}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                          {intern.title}
                        </h3>
                        <p className="font-bold text-slate-500 mb-4">{intern.company}</p>
                        
                        <div className="flex flex-wrap gap-6 items-center">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <MapPin size={16} className="text-blue-600" />
                            {intern.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <Clock size={16} className="text-blue-600" />
                            {intern.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <DollarSign size={16} className="text-blue-600" />
                            {intern.stipend}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <Calendar size={16} className="text-blue-600" />
                            Deadline: {intern.deadline}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end justify-between gap-4">
                      <div className="flex gap-2">
                        <button className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl hover:text-blue-600 transition-all">
                          <Bookmark size={20} />
                        </button>
                        <button className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl hover:text-blue-600 transition-all">
                          <Share2 size={20} />
                        </button>
                      </div>
                      <Link 
                        to={`/apply?domain=${intern.category}`}
                        className="btn-primary w-full md:w-auto px-8"
                      >
                        Apply Now
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Skill Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-wrap gap-2">
                    {intern.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-black rounded-lg">
                        {skill}
                      </span>
                    ))}
                    <span className="ml-auto text-xs font-black text-emerald-500 uppercase">
                      {intern.positions} Open Positions
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
              <div className="flex gap-2">
                {[1, 2, 3].map(p => (
                  <button key={p} className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center transition-all ${p === 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ size }) => <motion.div animate={{ scale: [0.8, 1.1, 1] }}><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></motion.div>;

export default Internships;
