import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.login': 'Employee Login',
    
    // Hero Section
    'hero.title': 'Comprehensive Health Records for',
    'hero.titleHighlight': 'Women & Children',
    'hero.subtitle': 'Empowering communities through accessible healthcare monitoring, maternal wellness tracking, and child development support.',
    'hero.startMonitoring': 'Start Monitoring',
    'hero.learnMore': 'Learn More',
    'hero.patientsServed': 'Patients Served',
    'hero.successRate': 'Success Rate',
    'hero.careAvailable': 'Care Available',
    
    // Features
    'features.title': 'Why Choose SheCure?',
    'features.subtitle': 'Comprehensive healthcare solutions designed for women and children',
    'features.maternal.title': 'Maternal Health Monitoring',
    'features.maternal.desc': 'Track pregnancy progress, appointments, and health metrics for expecting mothers.',
    'features.child.title': 'Child Development Tracking',
    'features.child.desc': 'Monitor growth milestones, vaccination schedules, and pediatric care.',
    'features.health.title': 'Health Record Management',
    'features.health.desc': 'Secure digital health records accessible anytime, anywhere.',
    'features.community.title': 'Community Healthcare',
    'features.community.desc': 'Connect with local healthcare providers and NGO support networks.',
    'features.appointment.title': 'Appointment Scheduling',
    'features.appointment.desc': 'Easy booking and management of healthcare appointments.',
    'features.reports.title': 'Health Reports & Analytics',
    'features.reports.desc': 'Generate detailed health reports and track wellness trends.',
    
    // About Developers
    'about.title': 'About the Developers',
    'about.subtitle': 'Meet the passionate team behind SheCure',
    
    // Footer
    'footer.mission': 'Our Mission',
    'footer.missionText': 'To provide accessible, comprehensive healthcare monitoring for women and children in underserved communities.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.contact': 'संपर्क',
    'nav.login': 'कर्मचारी लॉगिन',
    
    // Hero Section
    'hero.title': 'महिलाओं और बच्चों के लिए',
    'hero.titleHighlight': 'व्यापक स्वास्थ्य रिकॉर्ड',
    'hero.subtitle': 'सुलभ स्वास्थ्य निगरानी, मातृ कल्याण ट्रैकिंग, और बाल विकास सहायता के माध्यम से समुदायों को सशक्त बनाना।',
    'hero.startMonitoring': 'निगरानी शुरू करें',
    'hero.learnMore': 'और जानें',
    'hero.patientsServed': 'सेवा प्राप्त मरीज़',
    'hero.successRate': 'सफलता दर',
    'hero.careAvailable': 'देखभाल उपलब्ध',
    
    // Features
    'features.title': 'SheCure क्यों चुनें?',
    'features.subtitle': 'महिलाओं और बच्चों के लिए डिज़ाइन किए गए व्यापक स्वास्थ्य समाधान',
    'features.maternal.title': 'मातृ स्वास्थ्य निगरानी',
    'features.maternal.desc': 'गर्भवती माताओं के लिए गर्भावस्था की प्रगति, अपॉइंटमेंट और स्वास्थ्य मेट्रिक्स को ट्रैक करें।',
    'features.child.title': 'बाल विकास ट्रैकिंग',
    'features.child.desc': 'विकास मील के पत्थर, टीकाकरण कार्यक्रम और बाल चिकित्सा देखभाल की निगरानी करें।',
    'features.health.title': 'स्वास्थ्य रिकॉर्ड प्रबंधन',
    'features.health.desc': 'कभी भी, कहीं भी सुरक्षित डिजिटल स्वास्थ्य रिकॉर्ड एक्सेस करें।',
    'features.community.title': 'सामुदायिक स्वास्थ्य सेवा',
    'features.community.desc': 'स्थानीय स्वास्थ्य सेवा प्रदाताओं और NGO सहायता नेटवर्क से जुड़ें।',
    'features.appointment.title': 'अपॉइंटमेंट शेड्यूलिंग',
    'features.appointment.desc': 'स्वास्थ्य अपॉइंटमेंट की आसान बुकिंग और प्रबंधन।',
    'features.reports.title': 'स्वास्थ्य रिपोर्ट और विश्लेषण',
    'features.reports.desc': 'विस्तृत स्वास्थ्य रिपोर्ट तैयार करें और कल्याण रुझानों को ट्रैक करें।',
    
    // About Developers
    'about.title': 'डेवलपर्स के बारे में',
    'about.subtitle': 'SheCure के पीछे के उत्साही टीम से मिलें',
    
    // Footer
    'footer.mission': 'हमारा मिशन',
    'footer.missionText': 'कम सेवा वाले समुदायों में महिलाओं और बच्चों के लिए सुलभ, व्यापक स्वास्थ्य निगरानी प्रदान करना।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};