import InternshipCard from './InternshipCard';
import { Layout, Brain, Palette, ShieldCheck, Smartphone } from 'lucide-react';

const InternshipList = () => {
  const internships = [
    {
      domain: 'Web Development',
      icon: Layout,
      description: 'Master modern frontend and backend frameworks. Build responsive, high-performance web applications using MERN stack.',
    },
    {
      domain: 'AI & Machine Learning',
      icon: Brain,
      description: 'Dive deep into neural networks, data science, and predictive modeling. Work on real-world AI datasets.',
    },
    {
      domain: 'Graphic Designing',
      icon: Palette,
      description: 'Create stunning visual identities and user interfaces. Learn the principles of modern UI/UX and branding.',
    },
    {
      domain: 'Cybersecurity',
      icon: ShieldCheck,
      description: 'Learn ethical hacking, network security, and data protection. Help secure the future of digital infrastructure.',
    },
    {
      domain: 'Mobile App Development',
      icon: Smartphone,
      description: 'Build native and cross-platform mobile apps for iOS and Android. Master React Native and Flutter.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {internships.map((internship, index) => (
        <InternshipCard key={index} {...internship} />
      ))}
    </div>
  );
};

export default InternshipList;
