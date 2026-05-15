import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Internships', path: '/internships' },
        { name: 'Mentorship', path: '#' },
        { name: 'For Recruiters', path: '#' },
        { name: 'Pricing', path: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '#' },
        { name: 'Our Team', path: '#' },
        { name: 'Careers', path: '#' },
        { name: 'News & Blog', path: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '#' },
        { name: 'FAQs', path: '#' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Security', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30">
                T
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">TEYZIX CORE</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Empowering the next generation of technical talent with real-world industry experience and professional mentorship.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                <p className="text-sm font-bold text-slate-500">123 Tech Avenue, Silicon Valley, CA 94025</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 shrink-0" />
                <p className="text-sm font-bold text-slate-500">contact@teyzix.core</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600 shrink-0" />
                <p className="text-sm font-bold text-slate-500">+1 (800) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-slate-500">
            © {currentYear} TEYZIX CORE. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
