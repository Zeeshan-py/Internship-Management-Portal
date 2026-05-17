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

const InternshipsManagement = () => {
  const [internships, setInternships] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', duration: '3 months', location: 'Remote', status: 'Active' });
  const [saving, setSaving] = useState(false);

  // Fetch internships from backend on mount
  const fetchInternships = useCallback(async () => {
    try {
      setLoadingData(true);
      const res = await api.get('/internships');
      if (res.data?.data) setInternships(res.data.data);
    } catch {
      // Fallback to defaults if API fails
      setInternships([
        { _id: '1', title: 'Web Development Intern', applicants: 42, status: 'Active', description: 'Build modern web apps with React and Node.js', duration: '3 months', location: 'Remote', createdAt: new Date().toISOString() },
        { _id: '2', title: 'AI Research Assistant', applicants: 18, status: 'Active', description: 'Assist in AI/ML research projects', duration: '6 months', location: 'On-site', createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useState(() => { fetchInternships(); });

  const openCreate = () => { setEditingJob(null); setForm({ title: '', description: '', duration: '3 months', location: 'Remote', status: 'Active' }); setShowModal(true); };
  const openEdit = (job) => { setEditingJob(job); setForm({ title: job.title, description: job.description || '', duration: job.duration || '3 months', location: job.location || 'Remote', status: job.status }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Internship title is required.'); return; }
    setSaving(true);
    try {
      if (editingJob) {
        const res = await api.put(`/internships/${editingJob._id}`, form);
        if (res.data?.data) {
          setInternships(prev => prev.map(j => j._id === editingJob._id ? res.data.data : j));
          toast.success(`"${form.title}" updated successfully!`);
        }
      } else {
        const res = await api.post('/internships', form);
        if (res.data?.data) {
          setInternships(prev => [res.data.data, ...prev]);
          toast.success(`"${form.title}" posted successfully!`);
        }
      }
      setShowModal(false);
    } catch {
      toast.error('Failed to save internship. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    try {
      await api.delete(`/internships/${job._id}`);
      setInternships(prev => prev.filter(j => j._id !== job._id));
      toast.success(`"${job.title}" has been removed.`);
    } catch {
      toast.error('Failed to delete internship.');
    }
  };

  const toggleStatus = async (job) => {
    const next = job.status === 'Active' ? 'Paused' : 'Active';
    try {
      const res = await api.put(`/internships/${job._id}`, { status: next });
      if (res.data?.data) {
        setInternships(prev => prev.map(j => j._id === job._id ? res.data.data : j));
        toast.success(`"${job.title}" is now ${next}.`);
      }
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
  };

  const inputCls = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-blue-600 outline-none transition-all";

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Active Postings</h3>
        <button type="button" onClick={openCreate} className="btn-primary !py-2.5 px-6 rounded-xl text-sm">
          <Plus size={18} />
          Post Internship
        </button>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-16"><Loader className="w-8 h-8 text-blue-600 animate-spin" /></div>
      ) : internships.length === 0 ? (
        <div className="card-premium text-center py-16">
          <Briefcase size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-lg font-black text-slate-400">No internships posted yet</p>
          <p className="text-sm text-slate-500 mt-1">Click "Post Internship" to create your first posting.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((job) => (
            <div key={job._id} className="card-premium group">
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
                  <Briefcase size={24} />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(job)} className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Edit size={16} /></button>
                  <button type="button" onClick={() => handleDelete(job)} className="p-2 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{job.title}</h4>
              {job.description && <p className="text-xs text-slate-500 mb-3 line-clamp-2">{job.description}</p>}
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6">
                <span className="flex items-center gap-1"><Users size={12} /> {job.applicants || 0} Applicants</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {timeAgo(job.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => toggleStatus(job)} className={`badge cursor-pointer ${job.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{job.status}</button>
                <span className="text-[10px] font-bold text-slate-400">{job.duration || '3 months'} · {job.location || 'Remote'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{editingJob ? 'Edit Internship' : 'Post New Internship'}</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:bg-slate-200 transition-all"><XCircle size={20} /></button>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Title *</label>
                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Frontend Developer Intern" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the internship role..." className={inputCls + " resize-none"} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Duration</label>
                      <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className={inputCls}>
                        {['1 month','2 months','3 months','4 months','6 months','12 months'].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Location</label>
                      <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls}>
                        {['Remote','On-site','Hybrid'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <button type="button" onClick={handleSave} disabled={saving} className="flex-1 btn-primary !py-3.5 rounded-xl text-sm">
                    {saving ? <Loader size={18} className="animate-spin" /> : editingJob ? 'Save Changes' : 'Publish Internship'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3.5 rounded-xl font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

const NotificationsFullView = () => {
  const allNotifications = [
    { id: 1024, title: 'New Application Received', detail: 'A new internship application has been submitted for the Web Development Intern position by Ahmed Khan. The applicant has 2 years of experience in React.js and Node.js development. Please review the application in the Applications tab.', time: '12:40 PM', type: 'application', read: false },
    { id: 1025, title: 'Internship Status Updated', detail: 'The "AI Research Assistant" internship posting has been updated from Paused to Active. This posting will now be visible to applicants on the public portal. 18 existing applicants will be notified of the reactivation.', time: '12:41 PM', type: 'system', read: false },
    { id: 1026, title: 'Bulk Applications Export', detail: 'An administrator exported 42 application records from the Web Development Intern posting as CSV. The download was initiated from the Applications dashboard panel at 12:42 PM.', time: '12:42 PM', type: 'system', read: false },
    { id: 1027, title: 'System Backup Completed', detail: 'The scheduled daily database backup has been completed successfully. Backup size: 128 MB. All collections including Applications, Internships, and Admin settings have been archived. Next backup scheduled in 24 hours.', time: '12:43 PM', type: 'system', read: true },
    { id: 1028, title: 'Application Approved', detail: 'The application from Sara Malik for the UI/UX Design Intern position has been approved by Admin User. An automated confirmation email has been sent to the applicant with onboarding instructions.', time: '12:44 PM', type: 'application', read: true },
    { id: 1029, title: 'New Contact Message', detail: 'A new contact form submission was received from Hamza Ali regarding partnership inquiry. The message has been logged in the contact queue and is awaiting admin review.', time: '12:45 PM', type: 'application', read: true },
    { id: 1030, title: 'Security Alert', detail: 'An unusual login attempt was detected from IP 192.168.1.45. The attempt was blocked by the firewall. Please verify your recent login activity and consider enabling two-factor authentication for added security.', time: '12:46 PM', type: 'system', read: true },
    { id: 1031, title: 'Storage Usage Warning', detail: 'Database storage usage has reached 85% capacity (4.25 GB of 5 GB). Consider archiving old application records or upgrading your storage plan to avoid service interruption.', time: '12:47 PM', type: 'system', read: true },
  ];

  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'System') return n.type === 'system';
    return true;
  });

  const handleClick = (notif) => {
    setExpandedId(expandedId === notif.id ? null : notif.id);
    if (!notif.read) {
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="card-premium">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">All Notifications</h3>
          {unreadCount > 0 && <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{unreadCount} new</span>}
        </div>
        <div className="flex gap-2">
          {['All', 'Unread', 'System'].map(tab => (
            <button key={tab} type="button" onClick={() => setFilter(tab)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${filter === tab ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>{tab}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-center py-12 font-bold text-slate-400">No notifications in this category.</p>
        ) : filtered.map((notif) => (
          <div key={notif.id}>
            <div onClick={() => handleClick(notif)} className={`p-4 rounded-2xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer ${!notif.read ? 'border-l-4 border-blue-600 bg-blue-50/50 dark:bg-blue-600/5' : ''}`}>
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.type === 'application' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'}`}>
                  {notif.type === 'application' ? <Users size={18} /> : <Briefcase size={18} />}
                </div>
                <div>
                  <p className={`font-black text-slate-900 dark:text-white ${!notif.read ? '' : 'opacity-70'}`}>{notif.title}</p>
                  <p className="text-xs font-bold text-slate-500">{expandedId === notif.id ? 'Click to collapse' : notif.detail.slice(0, 60) + '...'}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 shrink-0 ml-4">{notif.time}</span>
            </div>
            <AnimatePresence>
              {expandedId === notif.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="mx-4 mb-2 p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{notif.detail}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className={`badge ${notif.type === 'application' ? 'badge-blue' : 'badge-purple'}`}>{notif.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">ID: #{notif.id} · {notif.time}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@teyzix.core', bio: 'Managing the platform infrastructure and student onboarding processes.' });
  const [saved, setSaved] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load settings from backend on mount
  useState(() => {
    (async () => {
      try {
        const res = await api.get('/admin-settings');
        if (res.data?.data) {
          const d = res.data.data;
          setProfile({ name: d.name || 'Admin User', email: d.email || 'admin@teyzix.core', bio: d.bio || '' });
          setTwoFA(d.twoFA || false);
        }
      } catch {
        // Use defaults on failure
      }
    })();
  });

  const handleSave = async () => {
    if (!profile.name.trim()) { toast.error('Name is required.'); return; }
    if (!profile.email.trim()) { toast.error('Email is required.'); return; }
    setSaving(true);
    try {
      await api.put('/admin-settings', { ...profile, twoFA });
      setSaved(true);
      toast.success('Profile settings saved permanently!');
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleTwoFA = async () => {
    const next = !twoFA;
    try {
      await api.put('/admin-settings', { ...profile, twoFA: next });
      setTwoFA(next);
      toast.success(next ? '2FA enabled successfully!' : '2FA disabled.');
    } catch {
      toast.error('Failed to update 2FA.');
    }
  };

  const inputCls = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-blue-600 outline-none transition-all";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="card-premium">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Account Profile</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Bio</label>
              <textarea rows="4" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} className={inputCls + " resize-none"} />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={handleSave} disabled={saving} className={`btn-primary !py-2.5 px-8 text-sm transition-all ${saved ? '!bg-emerald-600 !shadow-emerald-600/20' : ''}`}>
              {saving ? <Loader size={16} className="animate-spin" /> : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
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
                  <p className="text-xs font-bold text-slate-500">{twoFA ? 'Two-factor authentication is active.' : 'Add an extra layer of security to your account.'}</p>
                </div>
              </div>
              <button type="button" onClick={handleTwoFA} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${twoFA ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>{twoFA ? 'Enabled ✓' : 'Enable'}</button>
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
          <div className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center font-black text-4xl rounded-3xl shadow-xl shadow-blue-600/20 mb-6">{profile.name.charAt(0).toUpperCase()}</div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white">{profile.name}</h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Super Administrator</p>
          <p className="text-xs text-slate-400 mt-2 px-4 line-clamp-2">{profile.email}</p>
          <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-6"></div>
          <div className="w-full space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-400">Status</span>
              <span className="font-black text-emerald-500">Active Now</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-400">Last Login</span>
              <span className="font-black text-slate-900 dark:text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-400">2FA</span>
              <span className={`font-black ${twoFA ? 'text-emerald-500' : 'text-amber-500'}`}>{twoFA ? 'Enabled' : 'Disabled'}</span>
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
};

export default AdminDashboard;
