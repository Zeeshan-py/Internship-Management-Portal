import React from 'react';
import { Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold text-white tracking-tighter">
                TEYZIX<span className="text-blue-500">CORE</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering the next generation of tech leaders through high-impact internship opportunities. Join the future of innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/internships" className="text-slate-400 hover:text-white transition-colors">Browse Internships</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {[Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 TEYZIX CORE. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> for future developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
