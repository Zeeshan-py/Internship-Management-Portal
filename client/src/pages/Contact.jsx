import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    { icon: <Mail className="text-blue-600" />, title: 'Email Support', detail: 'support@teyzix.core', desc: 'Average response time: 2 hours' },
    { icon: <Phone className="text-purple-600" />, title: 'Direct Call', detail: '+1 (800) 123-4567', desc: 'Mon-Fri from 9am to 6pm' },
    { icon: <MapPin className="text-emerald-600" />, title: 'Headquarters', detail: 'Silicon Valley, CA', desc: 'Visit our main tech hub' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4"
          >
            Get in <span className="text-blue-600">Touch</span>
          </motion.h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions about our internships or mentorship programs? Our support team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium group"
              >
                <div className="flex gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white mb-1">{method.title}</h3>
                    <p className="text-blue-600 font-bold text-sm mb-1">{method.detail}</p>
                    <p className="text-slate-400 text-xs font-medium">{method.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 rounded-bl-full"></div>
              <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                <Globe size={20} className="text-blue-400" />
                Global Presence
              </h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                We support students from over 45 countries. No matter where you are, TEYZIX CORE is there to build your career.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium !p-8 md:!p-12 h-full"
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">Message Received!</h3>
                  <p className="text-slate-500 font-medium">Thank you for reaching out. A mentor will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                      <input type="text" required placeholder="Full Name" className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" required placeholder="email@company.com" className="input-field" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                    <select className="input-field appearance-none">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Internship Application Status</option>
                      <option>Mentorship Program</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                    <textarea required rows="6" placeholder="How can we help you?" className="input-field resize-none"></textarea>
                  </div>
                  <button className="btn-primary w-full py-5 text-lg">
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
