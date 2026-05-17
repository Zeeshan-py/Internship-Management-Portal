import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Cloud, 
  Palette,
  TrendingUp,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  Star,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const categories = [
    { name: 'Web Development', icon: <Code2 />, count: '24 Openings', color: 'bg-blue-500' },
    { name: 'AI & Machine Learning', icon: <Cpu />, count: '12 Openings', color: 'bg-purple-500' },
    { name: 'Cybersecurity', icon: <ShieldCheck />, count: '8 Openings', color: 'bg-emerald-500' },
    { name: 'Cloud Computing', icon: <Cloud />, count: '15 Openings', color: 'bg-sky-500' },
    { name: 'UI/UX Design', icon: <Palette />, count: '10 Openings', color: 'bg-pink-500' },
    { name: 'Mobile Development', icon: <Globe />, count: '18 Openings', color: 'bg-indigo-500' },
  ];

  const stats = [
    { label: 'Active Interns', value: '5,000+', icon: <Users className="text-blue-600" /> },
    { label: 'Applications', value: '120K+', icon: <Layers className="text-purple-600" /> },
    { label: 'Partner Companies', value: '450+', icon: <Briefcase className="text-emerald-600" /> },
    { label: 'Success Rate', value: '98%', icon: <TrendingUp className="text-amber-600" /> },
  ];

  const workflow = [
    { title: 'Apply', desc: 'Browse and submit your application with a professional resume.', step: '01' },
    { title: 'Screening', desc: 'Our team reviews your skills and portfolio for fitment.', step: '02' },
    { title: 'Interview', desc: 'Technical and cultural assessment with industry experts.', step: '03' },
    { title: 'Onboarding', desc: 'Get matched with a mentor and start your journey.', step: '04' },
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('Thanks! Weekly internship alerts are now enabled.');
    setNewsletterEmail('');
    window.setTimeout(() => setNewsletterStatus(''), 4000);
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Enrollment Open for Summer 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8"
            >
              Bridge the Gap Between <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Learning & Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10"
            >
              Join 5,000+ students gaining real-world experience at top-tier companies. 
              Our platform connects you with industry-leading internships tailored to your skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/internships" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                Explore Internships
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                Talk to Mentors
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="ml-4 h-6 w-64 bg-white/5 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-4 gap-4 h-full">
                <div className="col-span-1 bg-white/5 rounded-2xl p-4 space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-2 w-full bg-white/10 rounded"></div>
                  ))}
                  <div className="pt-8 space-y-4">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
                    <div className="h-8 w-8 bg-white/5 rounded-lg"></div>
                    <div className="h-8 w-8 bg-white/5 rounded-lg"></div>
                  </div>
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="h-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-4 flex items-center justify-between border border-white/5">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-white/20 rounded"></div>
                      <div className="h-6 w-48 bg-white/40 rounded"></div>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900"></div>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 h-[180px]">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="h-3 w-20 bg-white/20 mb-4 rounded"></div>
                      <div className="flex items-end gap-2 h-20">
                        {[40, 70, 45, 90, 65, 80].map((h, idx) => (
                          <div key={idx} className="flex-1 bg-blue-600/40 rounded-t" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                      <div className="h-3 w-24 bg-white/20 mb-2 rounded"></div>
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                          <div className="h-2 flex-1 bg-white/10 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -right-8 -bottom-8 hidden lg:block">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase">Verification Rate</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">99.8%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="section-title">Trending Domains</h2>
              <p className="section-desc">Master the most in-demand technical skills with curated professional internships.</p>
            </div>
            <Link to="/internships" className="group flex items-center gap-2 font-black text-blue-600">
              View All Domains
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Link to={`/internships?category=${encodeURIComponent(cat.name)}`} key={idx} className="card-premium group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${cat.color} opacity-10 rounded-bl-full`}></div>
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-2xl text-white ${cat.color} shadow-lg shadow-${cat.color.split('-')[1]}-500/30`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                    <p className="text-sm font-bold text-slate-500">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-24 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">How it Works</h2>
            <p className="section-desc mx-auto">Your journey from learning to professional implementation in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {workflow.map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-3xl font-black shadow-xl shadow-blue-600/30 relative z-10">
                  {item.step}
                </div>
                {idx < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-slate-200 dark:bg-slate-800 z-0"></div>
                )}
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Student Success Stories</h2>
            <p className="section-desc mx-auto">See how TEYZIX CORE helped these students launch their professional careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Frontend Intern @ Google",
                quote: "The AI & ML internship gave me hands-on experience that I couldn't get in college. The mentorship was world-class.",
                avatar: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                name: "David Chen",
                role: "Backend Intern @ Amazon",
                quote: "Teyzix Core bridged the gap between my academic theory and professional implementation perfectly.",
                avatar: "https://i.pravatar.cc/150?u=david"
              },
              {
                name: "Ahmad Khan",
                role: "Web Dev Intern @ Teyzix",
                quote: "The multi-step application process was smooth, and the dashboard tracking kept me motivated throughout.",
                avatar: "https://i.pravatar.cc/150?u=ahmad"
              }
            ].map((student, idx) => (
              <div key={idx} className="card-premium">
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
                  "{student.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full bg-slate-200 object-cover" />
                  <div>
                    <p className="font-black text-slate-900 dark:text-white">{student.name}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase">{student.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <h2 className="text-4xl font-black text-white mb-6">Never Miss an Opportunity</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto font-medium">Subscribe to our newsletter to get weekly internship alerts and career tips delivered to your inbox.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border-0 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-400/50 outline-none transition-all"
              />
              <button className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
                Subscribe
              </button>
            </form>
            {newsletterStatus && (
              <p className="mt-4 text-sm font-bold text-white">{newsletterStatus}</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Who can apply for these internships?', a: 'Students in their final year, fresh graduates, and career changers are all welcome to apply.' },
              { q: 'Is there a stipend involved?', a: 'Most of our internships are paid. Specific stipend amounts are listed on each internship card.' },
              { q: 'Will I get a certificate?', a: 'Yes, every successful internship completion is rewarded with a verified professional certificate.' },
            ].map((faq, idx) => (
              <div key={idx} className="card-premium cursor-pointer group" onClick={() => toggleFaq(idx)}>
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-slate-900 dark:text-white">{faq.q}</h4>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }}>
                    <ChevronDown className={`transition-colors ${openFaq === idx ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
