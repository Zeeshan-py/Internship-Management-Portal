import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Upload, 
  Briefcase, 
  ChevronRight, 
  ChevronLeft,
  FileText
} from 'lucide-react';
import api from '../services/api';

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialDomain = queryParams.get('domain') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: initialDomain,
    message: '',
    experience: 'Fresher',
    education: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const domains = ['Web Development', 'AI & Machine Learning', 'Graphic Designing', 'Cybersecurity', 'Mobile App Development', 'Cloud Computing'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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

  const steps = [
    { id: 1, title: 'Personal Info', icon: <User size={20} /> },
    { id: 2, title: 'Professional Info', icon: <Briefcase size={20} /> },
    { id: 3, title: 'Final Review', icon: <CheckCircle2 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-blue-600 transition-all duration-500 -z-10" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white dark:bg-slate-900 text-slate-400 border-2 border-slate-200 dark:border-slate-800'
                }`}>
                  {s.icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${step >= s.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-premium !p-8 md:!p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-900 pb-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Basic Information</h2>
                  <p className="text-slate-500 font-medium">Please provide your contact details for communication.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Education</label>
                    <input name="education" type="text" required value={formData.education} onChange={handleChange} placeholder="Bachelor of Science" className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-900 pb-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Professional Details</h2>
                  <p className="text-slate-500 font-medium">Help us understand your skills and experience better.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Internship Domain</label>
                    <select name="domain" required value={formData.domain} onChange={handleChange} className="input-field appearance-none">
                      <option value="" disabled>Select Domain</option>
                      {domains.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Experience Level</label>
                    <select name="experience" required value={formData.experience} onChange={handleChange} className="input-field appearance-none">
                      <option value="Fresher">Fresher (0 Years)</option>
                      <option value="Junior">Junior (1-2 Years)</option>
                      <option value="Senior">Senior (3+ Years)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Technical Skills (Comma separated)</label>
                  <input name="skills" type="text" required value={formData.skills} onChange={handleChange} placeholder="React, Node, Python..." className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Resume / CV Link</label>
                  <div className="relative">
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                    <input type="url" placeholder="Google Drive or Dropbox link" className="input-field pl-12" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-900 pb-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Final Statement</h2>
                  <p className="text-slate-500 font-medium">Tell us why you're a great fit for this internship.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Cover Letter / Message</label>
                  <textarea name="message" required value={formData.message} onChange={handleChange} rows="6" placeholder="Describe your passion and relevant project work..." className="input-field resize-none"></textarea>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Submission Agreement</p>
                      <p className="text-sm text-slate-500 font-medium">By clicking submit, you agree to our terms of service and confirm that all information provided is accurate.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Messages */}
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl flex items-center space-x-3 ${
                  status.type === 'success' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="font-bold">{status.message}</p>
              </motion.div>
            )}

            {/* Form Navigation */}
            <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-900">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary flex-1">
                  <ChevronLeft size={20} />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="btn-primary flex-1">
                  Next Step
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? <Loader2 className="animate-spin" /> : 'Submit Application'}
                  {!loading && <Send size={20} />}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
