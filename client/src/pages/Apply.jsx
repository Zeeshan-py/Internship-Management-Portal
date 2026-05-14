import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialDomain = queryParams.get('domain') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: initialDomain,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const domains = [
    'Web Development',
    'AI & Machine Learning',
    'Graphic Designing',
    'Cybersecurity',
    'Mobile App Development',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/applications', formData);
      setStatus({ type: 'success', message: 'Application submitted successfully! Redirecting...' });
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden relative"
        >
          {/* Form Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-white mb-4">Apply for Internship</h1>
            <p className="text-slate-400">Fill out the form below and start your professional journey with us.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Internship Domain</label>
                <select
                  name="domain"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select a domain</option>
                  {domains.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Message / Cover Letter</label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Tell us why you are a good fit for this role..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Status Messages */}
            {status.message && (
              <div className={`p-4 rounded-xl flex items-center space-x-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <p className="font-bold">{status.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
