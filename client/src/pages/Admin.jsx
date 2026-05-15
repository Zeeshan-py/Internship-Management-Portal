import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Loader2 as Loader,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  MoreVertical,
  Download,
  Eye,
  TrendingUp,
  Clock
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
      setLoginError('Invalid credentials. Access denied.');
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
      setError('Failed to fetch applications. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDomain === 'All' || app.domain === filterDomain;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Applicants', value: applications.length, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Web Development', value: applications.filter(a => a.domain === 'Web Development').length, icon: <LayoutDashboard size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Review', value: applications.length, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Growth', value: '+12%', icon: <TrendingUp size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-10 rounded-bl-full"></div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-blue-600/30">T</div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Admin Console</h2>
            <p className="text-slate-400 font-medium">Verify your identity to proceed</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Master Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-600 outline-none transition-all" />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold text-center">{loginError}</p>}
            <button className="w-full btn-primary py-4 rounded-2xl text-lg">Authorize Access</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">T</div>
            <span className="font-black text-slate-900 dark:text-white tracking-tighter">ADMIN PANEL</span>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-2">
          {[
            { label: 'Overview', icon: <LayoutDashboard size={18} />, active: true },
            { label: 'Applications', icon: <Users size={18} /> },
            { label: 'Internships', icon: <Briefcase size={18} /> },
            { label: 'Notifications', icon: <Bell size={18} /> },
            { label: 'Settings', icon: <Settings size={18} /> },
          ].map(item => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
            <p className="text-slate-500 font-medium">Monitoring all active internship applications</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">Admin User</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="card-premium">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <MoreVertical size={16} className="text-slate-400" />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Applications Table Section */}
        <div className="card-premium !p-0 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Applications</h3>
            <div className="flex w-full md:w-auto gap-4">
              <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search applicants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all" />
              </div>
              <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Applicant</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Domain</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center">
                      <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center font-bold text-slate-400">No applications found.</td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold">{app.name.charAt(0)}</div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">{app.name}</p>
                            <p className="text-xs font-bold text-slate-500">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="badge badge-blue">{app.domain}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="badge badge-amber flex items-center gap-1 w-fit">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                          Pending Review
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                        <button onClick={() => setSelectedApplication(app)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:text-blue-600 transition-all">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedApplication && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl">{selectedApplication.name.charAt(0)}</div>
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{selectedApplication.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge badge-blue">{selectedApplication.domain}</span>
                          <span className="text-xs font-bold text-slate-500">ID: {selectedApplication._id.slice(-6)}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedApplication(null)} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full hover:bg-slate-200 transition-all"><XCircle size={24} /></button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Mail size={16} className="text-blue-600" />{selectedApplication.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-blue-600" />{selectedApplication.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Letter</p>
                    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                      "{selectedApplication.message}"
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
                      <CheckCircle size={18} />
                      Approve Candidate
                    </button>
                    <button className="flex-1 bg-red-600/10 text-red-600 py-4 rounded-2xl font-black text-sm hover:bg-red-600/20 transition-all">
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
