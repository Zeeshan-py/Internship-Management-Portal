import React from 'react';
import HeroSection from '../components/HeroSection';
import InternshipList from '../components/InternshipList';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Explore <span className="text-blue-500">Domains</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choose a path that aligns with your passion. Our internships are designed to give you hands-on experience.
          </p>
        </div>

        <InternshipList />
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-900/30 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-16 uppercase tracking-widest text-slate-500">Why TEYZIX CORE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: 'Industry Mentors', desc: 'Get direct guidance from experts working in top tech companies.' },
              { title: 'Project-Based', desc: 'No theory-only learning. You build products that people actually use.' },
              { title: 'Verified Certificate', desc: 'Boost your resume with a globally recognized completion certificate.' }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-950 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
