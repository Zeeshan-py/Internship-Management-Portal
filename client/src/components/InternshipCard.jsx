import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InternshipCard = ({ domain, icon: Icon, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-slate-900/50 border border-white/10 p-8 rounded-3xl hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-blue-600/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
          <Icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
        </div>
        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          New
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">{domain}</h3>
      <p className="text-slate-400 mb-8 leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-2 text-slate-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>3-6 Months</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Remote</span>
        </div>
      </div>

      <Link
        to={`/apply?domain=${encodeURIComponent(domain)}`}
        className="flex items-center justify-center space-x-2 w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-colors group/btn"
      >
        <span>Apply Now</span>
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default InternshipCard;
