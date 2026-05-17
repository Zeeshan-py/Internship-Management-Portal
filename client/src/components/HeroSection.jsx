import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-blue-950/30 border border-blue-500/30 px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-bold tracking-wide uppercase">Summer 2024 Applications Open</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
        >
          Launch Your Tech <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
            Career Journey.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Join TEYZIX CORE and work on real-world projects with industry mentors. We don't just offer internships; we shape the future of engineering.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            to="/internships"
            className="group flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <span>Browse Internships</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center space-x-2 text-slate-400">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="font-medium">Free Certification Included</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
