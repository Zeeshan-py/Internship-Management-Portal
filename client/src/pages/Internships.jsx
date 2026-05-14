import React from 'react';
import InternshipList from '../components/InternshipList';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Internships = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Available <span className="text-blue-500">Opportunities</span>
          </motion.h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-slate-400 text-lg max-w-2xl">
              Explore our current internship domains and find the perfect match for your skills. We offer remote roles across multiple tech domains.
            </p>
            {/* Search Bar Placeholder */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search domains..."
                className="bg-slate-900 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white focus:border-blue-500 focus:outline-none w-full md:w-80 transition-all"
              />
            </div>
          </div>
        </header>

        <InternshipList />
      </div>
    </div>
  );
};

export default Internships;
