import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'support@teyzixcore.com' },
    { icon: Phone, label: 'Call Us', value: '+1 (555) 000-TEYZ' },
    { icon: MapPin, label: 'Our HQ', value: '123 Tech Valley, CA, USA' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Get in <span className="text-blue-500">Touch</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have questions about our internship program? Our team is here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 border border-white/10 p-10 rounded-[2.5rem] text-center group hover:bg-slate-900 transition-all"
            >
              <div className="inline-flex p-5 bg-blue-600/10 rounded-3xl mb-6 group-hover:bg-blue-600 transition-colors">
                <item.icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
              <p className="text-slate-400 font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Minimal FAQ / Support Section */}
        <div className="mt-32 p-12 bg-blue-600 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <MessageSquare className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
              Check out our Help Center or chat with a student ambassador to learn more about the TEYZIX experience.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform active:scale-95 shadow-2xl">
              Visit Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
