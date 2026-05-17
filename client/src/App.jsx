import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Internships from './pages/Internships';
import Apply from './pages/Apply';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
