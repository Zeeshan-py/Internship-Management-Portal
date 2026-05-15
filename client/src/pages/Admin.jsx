import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  ArrowRight,
  Loader2 as Loader
} from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/applications/login', { password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setLoginError('');
      }
    } catch (err) {
      setLoginError('Invalid password. Access denied.');
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/applications/all');
      if (response.data && Array.isArray(response.data.data)) {
        setApplications(response.data.data);
      } else {
        setError('Received invalid data format from server.');
      }
    } catch (err) {
      setError('Failed to fetch applications. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Admin Login</h2>
            <p className="text-slate-400">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-600 focus:outline-none transition-all"
            />
            {loginError && <p className="text-red-500 text-sm font-bold text-center">{loginError}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all active:scale-95">
              Login to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDomain === 'All' || app.domain === filterDomain;
    return matchesSearch && matchesFilter;
  });

  const domains = ['All', 'Web Development', 'UI/UX Design', 'Data Science', 'Mobile App Development', 'Cyber Security'];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage and review all internship applications</p>
          </div>
          <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <div className="text-center px-4 border-r border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
              <p className="text-xl font-bold text-white">{applications.length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-blue-500 uppercase font-bold">New Today</p>
              <p className="text-xl font-bold text-blue-400">
                {applications.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-gray-900/50 border border-gray-700/50 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              className="w-full bg-gray-900/50 border border-gray-700/50 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications List */}
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 font-medium">{error}</p>
            <button 
              onClick={fetchApplications}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-gray-800/20 border border-gray-700/30 p-12 rounded-2xl text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No applications found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={app._id}
                className="group bg-gray-900/40 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all backdrop-blur-sm relative overflow-hidden"
              >
                {/* Decorative background pulse */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{app.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(app.createdAt).toLocaleDateString(undefined, { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                    {app.domain}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-4 h-4 text-blue-500/50" />
                    <span className="text-sm">{app.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-4 h-4 text-blue-500/50" />
                    <span className="text-sm">{app.phone}</span>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Message / Cover Letter</p>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{app.message}"
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Verified Application</span>
                  </div>
                  <button 
                    onClick={() => setSelectedApplication(app)}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-bold group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="px-4 py-1.5 bg-blue-600/10 text-blue-400 text-xs font-black uppercase rounded-full border border-blue-600/20 mb-4 inline-block">
                      {selectedApplication.domain}
                    </span>
                    <h2 className="text-4xl font-black text-white">{selectedApplication.name}</h2>
                    <p className="text-slate-400 mt-1">Applied on {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
                  >
                    <XCircle className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                    <p className="text-white font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Phone Number</p>
                    <p className="text-white font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      {selectedApplication.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Cover Letter / Message</p>
                  <div className="bg-slate-950/50 border border-white/5 p-6 rounded-2xl">
                    <p className="text-slate-300 leading-relaxed italic whitespace-pre-wrap">
                      "{selectedApplication.message}"
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex gap-4">
                  <button 
                    onClick={() => setSelectedApplication(null)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black transition-all active:scale-95"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
