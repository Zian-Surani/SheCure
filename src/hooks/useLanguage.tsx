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
    'nav.dashboard': 'Dashboard',
    'nav.patients': 'Patients',
    'nav.appointments': 'Appointments',
    'nav.reports': 'Reports',
    'nav.signOut': 'Sign Out',
    
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
    'about.ramya.name': 'Ramya Prabha B',
    'about.ramya.role': 'Lead Developer',
    'about.ramya.bio': 'Passionate healthcare technology developer with expertise in creating accessible digital solutions for maternal and child health initiatives.',
    'about.vaishnavi.name': 'Vaishnavi Soni',
    'about.vaishnavi.role': 'Frontend Developer',
    'about.vaishnavi.bio': 'Experienced in building user-friendly interfaces and implementing responsive designs for healthcare applications.',
    
    // Dashboard
    'dashboard.title': 'Health Dashboard',
    'dashboard.subtitle': 'Monitor health records and track patient wellness',
    'dashboard.totalPatients': 'Total Patients',
    'dashboard.healthyPregnancies': 'Healthy Pregnancies',
    'dashboard.childrenVaccinated': 'Children Monitored',
    'dashboard.activeCases': 'Active Cases',
    'dashboard.recentPatients': 'Recent Patients',
    'dashboard.healthMetrics': 'Health Metrics',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.addNewPatient': 'Add New Patient',
    'dashboard.scheduleAppointment': 'Schedule Appointment',
    'dashboard.generateReport': 'Generate Report',
    'dashboard.maternalHealth': 'Maternal Health',
    'dashboard.childWellness': 'Child Wellness',
    'dashboard.vaccinationRate': 'Vaccination Rate',
    'dashboard.patientDetails': 'Patient Details',
    'dashboard.viewMedicalHistory': 'View Medical History',
    'dashboard.updateRecords': 'Update Records',
    
    // Auth Page
    'auth.welcomeBack': 'Welcome Back',
    'auth.joinSheCure': 'Join SheCure',
    'auth.signInAccount': 'Sign in to your NGO employee account',
    'auth.createAccount': 'Create your NGO employee account',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.dontHaveAccount': "Don't have an account? Sign up",
    'auth.alreadyHaveAccount': 'Already have an account? Sign in',
    'auth.backToHome': 'Back to Home',
    
    // Common Actions
    'common.viewDetails': 'View Details',
    'common.schedule': 'Schedule',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.update': 'Update',
    
    // Footer
    'footer.mission': 'Our Mission',
    'footer.missionText': 'To provide accessible, comprehensive healthcare monitoring for women and children in underserved communities.',
    'footer.copyright': '© 2025 SheCure. Built with ❤️ for better healthcare.',
    'footer.tagline': 'Empowering women and children through accessible healthcare',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.contact': 'संपर्क',
    'nav.login': 'कर्मचारी लॉगिन',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.patients': 'मरीज़',
    'nav.appointments': 'अपॉइंटमेंट',
    'nav.reports': 'रिपोर्ट',
    'nav.signOut': 'साइन आउट',
    
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
    'about.ramya.name': 'रम्या प्रभा बी',
    'about.ramya.role': 'मुख्य डेवलपर',
    'about.ramya.bio': 'मातृ और बाल स्वास्थ्य पहलों के लिए सुलभ डिजिटल समाधान बनाने में विशेषज्ञता रखने वाली स्वास्थ्य प्रौद्योगिकी डेवलपर।',
    'about.vaishnavi.name': 'वैष्णवी सोनी',
    'about.vaishnavi.role': 'फ्रंटएंड डेवलपर',
    'about.vaishnavi.bio': 'स्वास्थ्य एप्लिकेशन के लिए उपयोगकर्ता-अनुकूल इंटरफेस बनाने और रिस्पॉन्सिव डिज़ाइन लागू करने में अनुभवी।',
    
    // Dashboard
    'dashboard.title': 'स्वास्थ्य डैशबोर्ड',
    'dashboard.subtitle': 'स्वास्थ्य रिकॉर्ड की निगरानी करें और मरीज़ों के कल्याण को ट्रैक करें',
    'dashboard.totalPatients': 'कुल मरीज़',
    'dashboard.healthyPregnancies': 'स्वस्थ गर्भावस्था',
    'dashboard.childrenVaccinated': 'बच्चों की निगरानी',
    'dashboard.activeCases': 'सक्रिय मामले',
    'dashboard.recentPatients': 'हाल के मरीज़',
    'dashboard.healthMetrics': 'स्वास्थ्य मेट्रिक्स',
    'dashboard.quickActions': 'त्वरित कार्य',
    'dashboard.addNewPatient': 'नया मरीज़ जोड़ें',
    'dashboard.scheduleAppointment': 'अपॉइंटमेंट शेड्यूल करें',
    'dashboard.generateReport': 'रिपोर्ट जेनरेट करें',
    'dashboard.maternalHealth': 'मातृ स्वास्थ्य',
    'dashboard.childWellness': 'बाल कल्याण',
    'dashboard.vaccinationRate': 'टीकाकरण दर',
    'dashboard.patientDetails': 'मरीज़ विवरण',
    'dashboard.viewMedicalHistory': 'चिकित्सा इतिहास देखें',
    'dashboard.updateRecords': 'रिकॉर्ड अपडेट करें',
    
    // Auth Page
    'auth.welcomeBack': 'वापस स्वागत है',
    'auth.joinSheCure': 'SheCure में शामिल हों',
    'auth.signInAccount': 'अपने NGO कर्मचारी खाते में साइन इन करें',
    'auth.createAccount': 'अपना NGO कर्मचारी खाता बनाएं',
    'auth.fullName': 'पूरा नाम',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.signIn': 'साइन इन',
    'auth.signUp': 'साइन अप',
    'auth.dontHaveAccount': 'खाता नहीं है? साइन अप करें',
    'auth.alreadyHaveAccount': 'पहले से खाता है? साइन इन करें',
    'auth.backToHome': 'होम पर वापस जाएं',
    
    // Common Actions
    'common.viewDetails': 'विवरण देखें',
    'common.schedule': 'शेड्यूल',
    'common.close': 'बंद करें',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.update': 'अपडेट करें',
    
    // Footer
    'footer.mission': 'हमारा मिशन',
    'footer.missionText': 'कम सेवा वाले समुदायों में महिलाओं और बच्चों के लिए सुलभ, व्यापक स्वास्थ्य निगरानी प्रदान करना।',
    'footer.copyright': '© 2025 SheCure. बेहतर स्वास्थ्य सेवा के लिए ❤️ के साथ बनाया गया।',
    'footer.tagline': 'सुलभ स्वास्थ्य देखभाल के माध्यम से महिलाओं और बच्चों को सशक्त बनाना',
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