import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Search,
  Loader2 as Loader,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  MoreVertical,
  Download,
  Eye,
  TrendingUp,
  Clock,
  Plus,
  Shield,
  Globe,
  Lock,
  Trash2,
  Edit
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
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
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/applications/all');
      if (response.data && Array.isArray(response.data.data)) {
        setApplications(response.data.data);
      } else {
        setError('Received invalid data format from server.');
      }
    } catch {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/applications/login', { password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setLoginError('');
        toast.success('Access Granted');
        await fetchApplications();
      }
    } catch {
      setLoginError('Invalid credentials. Access denied.');
      toast.error('Login Failed');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(true);
    try {
      const response = await api.put(`/applications/${id}/status`, { status });
      if (response.data.success) {
        setApplications(prev => prev.map(app => app._id === id ? { ...app, status: status } : app));
        setSelectedApplication(null);
        toast.success(`Application ${status} successfully!`);
      }
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadCsv = () => {
    if (filteredApplications.length === 0) {
      toast.error('No applications to export.');
      return;
    }
    const headers = ['Name', 'Email', 'Phone', 'Domain', 'Status', 'Created'];
    const rows = filteredApplications.map(app => [
      app.name,
      app.email,
      app.phone,
      app.domain,
      app.status || 'Pending Review',
      new Date(app.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'applications.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Applications exported.');
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDomain === 'All' || app.domain === filterDomain;
    return matchesSearch && matchesFilter;
  });

  const domains = ['All', ...new Set(applications.map(app => app.domain).filter(Boolean))];

  const stats = [
    { label: 'Total Applicants', value: applications.length, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Approved', value: applications.filter(a => a.status === 'Approved').length, icon: <CheckCircle size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, icon: <XCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Growth', value: '+12%', icon: <TrendingUp size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <Toaster position="top-right" />
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
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col sticky top-0 h-screen z-10">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">T</div>
            <span className="font-black text-slate-900 dark:text-white tracking-tighter">ADMIN PANEL</span>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-2">
          {[
            { label: 'Overview', icon: <LayoutDashboard size={18} /> },
            { label: 'Applications', icon: <Users size={18} /> },
            { label: 'Internships', icon: <Briefcase size={18} /> },
            { label: 'Notifications', icon: <Bell size={18} /> },
            { label: 'Settings', icon: <Settings size={18} /> },
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === item.label ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
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
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTab}</h1>
            <p className="text-slate-500 font-medium">Monitoring all active internship operations</p>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setActiveTab('Notifications')} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-black rounded-full">A</div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">Admin User</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ApplicationsList 
                  loading={loading} 
                  error={error}
                  filteredApplications={filteredApplications} 
                  setSelectedApplication={setSelectedApplication} 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  domains={domains}
                  filterDomain={filterDomain}
                  setFilterDomain={setFilterDomain}
                  onDownloadCsv={handleDownloadCsv}
                />
              </div>
              <div className="space-y-8">
                <RecentNotifications />
                <QuickActions />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Applications' && (
          <ApplicationsList 
            loading={loading} 
            error={error}
            filteredApplications={filteredApplications} 
            setSelectedApplication={setSelectedApplication} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            domains={domains}
            filterDomain={filterDomain}
            setFilterDomain={setFilterDomain}
            onDownloadCsv={handleDownloadCsv}
            isFullView={true}
          />
        )}

        {activeTab === 'Internships' && (
          <InternshipsManagement />
        )}

        {activeTab === 'Notifications' && (
          <NotificationsFullView />
        )}

        {activeTab === 'Settings' && (
          <AdminSettings />
        )}

        {/* Details Modal */}
        <AnimatePresence>
          {selectedApplication && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl uppercase">{selectedApplication.name.charAt(0)}</div>
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
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2 truncate"><Mail size={16} className="text-blue-600 shrink-0" />{selectedApplication.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-blue-600" />{selectedApplication.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Letter</p>
                    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                      "{selectedApplication.message}"
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                    <button 
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'Approved')}
                      disabled={updating}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {updating ? <Loader size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                      Approve Candidate
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedApplication._id, 'Rejected')}
                      disabled={updating}
                      className="flex-1 bg-red-600/10 text-red-600 py-4 rounded-2xl font-black text-sm hover:bg-red-600/20 transition-all disabled:opacity-50"
                    >
                      {updating ? <Loader size={18} className="animate-spin" /> : 'Reject'}
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

/* --- Sub-components for Admin Modules --- */

const ApplicationsList = ({ loading, error, filteredApplications, setSelectedApplication, searchTerm, setSearchTerm, domains = ['All'], filterDomain = 'All', setFilterDomain, onDownloadCsv, isFullView = false }) => (
  <div className="card-premium !p-0 overflow-hidden">
    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <h3 className="text-xl font-black text-slate-900 dark:text-white">
        {isFullView ? 'Master Application Database' : 'Recent Submissions'}
      </h3>
      <div className="flex w-full md:w-auto gap-4">
        <div className="relative flex-1 md:w-64">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search applicants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all" />
        </div>
        <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className="hidden md:block bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-blue-600">
          {domains.map(domain => <option key={domain} value={domain}>{domain}</option>)}
        </select>
        <button type="button" onClick={onDownloadCsv} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-blue-600 transition-all">
          <Download size={18} />
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[800px]">
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
          ) : error ? (
            <tr>
              <td colSpan="5" className="px-8 py-12 text-center font-bold text-red-500">{error}</td>
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
                    <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center font-bold uppercase">{app.name.charAt(0)}</div>
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
                  <span className={`badge flex items-center gap-1 w-fit ${app.status === 'Approved' ? 'badge-green' : app.status === 'Rejected' ? 'badge-red' : 'badge-amber'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${app.status === 'Approved' ? 'bg-emerald-600' : app.status === 'Rejected' ? 'bg-red-600' : 'bg-amber-600'}`}></div>
                    {app.status || 'Pending Review'}
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
);

const InternshipsManagement = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-black text-slate-900 dark:text-white">Active Postings</h3>
      <button type="button" onClick={() => toast.success('Post internship form coming next.')} className="btn-primary !py-2.5 px-6 rounded-xl text-sm">
        <Plus size={18} />
        Post Internship
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { title: 'Web Development Intern', applicants: 42, status: 'Active', date: '2 days ago' },
        { title: 'AI Research Assistant', applicants: 18, status: 'Active', date: '5 days ago' },
        { title: 'UI/UX Design Intern', applicants: 29, status: 'Active', date: '1 week ago' },
        { title: 'Cybersecurity Analyst', applicants: 12, status: 'Paused', date: '2 weeks ago' },
      ].map((job, i) => (
        <div key={i} className="card-premium group">
          <div className="flex justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => toast.success(`Editing ${job.title}`)} className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Edit size={16} /></button>
              <button type="button" onClick={() => toast.success(`${job.title} marked for review.`)} className="p-2 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{job.title}</h4>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6">
            <span className="flex items-center gap-1"><Users size={12} /> {job.applicants} Applicants</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {job.date}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className={`badge ${job.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{job.status}</span>
            <button type="button" onClick={() => toast.success(`Analytics opened for ${job.title}`)} className="text-sm font-black text-blue-600 hover:underline">View Analytics</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentNotifications = () => (
  <div className="card-premium">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-black text-slate-900 dark:text-white">Recent Alerts</h3>
      <button type="button" onClick={() => toast.success('Alerts cleared.')} className="text-xs font-black text-blue-600 uppercase tracking-widest">Clear All</button>
    </div>
    <div className="space-y-4">
      {[
        { text: 'New application received for Web Dev', time: '2 mins ago', icon: <Users size={14} />, bg: 'bg-blue-50 text-blue-600' },
        { text: 'System backup completed successfully', time: '1 hour ago', icon: <Shield size={14} />, bg: 'bg-emerald-50 text-emerald-600' },
        { text: 'Database storage is 85% full', time: '3 hours ago', icon: <Bell size={14} />, bg: 'bg-amber-50 text-amber-600' },
      ].map((note, i) => (
        <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${note.bg}`}>
            {note.icon}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{note.text}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{note.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="card-premium bg-slate-900 !border-0 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full"></div>
    <h3 className="text-lg font-black mb-6 relative z-10">System Status</h3>
    <div className="space-y-4 relative z-10">
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">Server Cluster</span>
        </div>
        <span className="text-xs font-black text-emerald-500">OPTIMAL</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-sm font-bold">API Gateway</span>
        </div>
        <span className="text-xs font-black text-emerald-500">12ms LATENCY</span>
      </div>
    </div>
    <button type="button" onClick={() => toast.success('Security scan completed.')} className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2">
      <Shield size={16} />
      Security Scan
    </button>
  </div>
);

const NotificationsFullView = () => (
  <div className="card-premium">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-black text-slate-900 dark:text-white">All Notifications</h3>
      <div className="flex gap-2">
        <button type="button" onClick={() => toast.success('Showing all notifications.')} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-black">All</button>
        <button type="button" onClick={() => toast.success('Showing unread notifications.')} className="px-4 py-2 text-slate-500 text-xs font-black">Unread</button>
        <button type="button" onClick={() => toast.success('Showing system notifications.')} className="px-4 py-2 text-slate-500 text-xs font-black">System</button>
      </div>
    </div>
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`p-4 rounded-2xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer ${i < 3 ? 'border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-600/5' : ''}`}>
          <div className="flex gap-4 items-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
              {i % 2 === 0 ? <Users size={18} /> : <Briefcase size={18} />}
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white">System Notification #{i + 1024}</p>
              <p className="text-xs font-bold text-slate-500">A new action was performed on the administrative console.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">12:4{i} PM</span>
        </div>
      ))}
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="card-premium">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Account Profile</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Name</label>
            <input type="text" defaultValue="Admin User" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm focus:border-blue-600 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
            <input type="email" defaultValue="admin@teyzix.core" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm focus:border-blue-600 outline-none" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Bio</label>
            <textarea rows="4" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm focus:border-blue-600 outline-none resize-none">Managing the platform infrastructure and student onboarding processes.</textarea>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button type="button" onClick={() => toast.success('Settings saved.')} className="btn-primary !py-2.5 px-8 text-sm">Save Changes</button>
        </div>
      </div>

      <div className="card-premium">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Security & Privacy</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 text-blue-600 rounded-xl"><Lock size={20} /></div>
              <div>
                <p className="font-black text-slate-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-xs font-bold text-slate-500">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button type="button" onClick={() => toast.success('Two-factor setup started.')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black">Enable</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600/10 text-purple-600 rounded-xl"><Globe size={20} /></div>
              <div>
                <p className="font-black text-slate-900 dark:text-white">Public API Access</p>
                <p className="text-xs font-bold text-slate-500">Generate keys for external system integrations.</p>
              </div>
            </div>
            <button type="button" onClick={() => toast.success('API access manager opened.')} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs font-black">Manage</button>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-8">
      <div className="card-premium flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center font-black text-4xl rounded-3xl shadow-xl shadow-blue-600/20 mb-6">A</div>
        <h4 className="text-xl font-black text-slate-900 dark:text-white">Admin User</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Super Administrator</p>
        <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-6"></div>
        <div className="w-full space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-slate-400">Status</span>
            <span className="font-black text-emerald-500">Active Now</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold text-slate-400">Last Login</span>
            <span className="font-black text-slate-900 dark:text-white">10:42 AM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold text-slate-400">Permissions</span>
            <span className="font-black text-slate-900 dark:text-white">Owner</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
