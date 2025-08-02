import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import DeveloperCard from "@/components/DeveloperCard";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  Heart, 
  Baby, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3,
  Shield,
  Stethoscope
} from "lucide-react";

const Index = () => {
  const { t, setLanguage } = useLanguage();

  const features = [
    {
      title: t('features.maternal.title'),
      description: t('features.maternal.desc'),
      icon: Heart,
      gradient: "bg-gradient-primary"
    },
    {
      title: t('features.child.title'),
      description: t('features.child.desc'),
      icon: Baby,
      gradient: "bg-health-pink"
    },
    {
      title: t('features.health.title'),
      description: t('features.health.desc'),
      icon: FileText,
      gradient: "bg-health-purple"
    },
    {
      title: t('features.community.title'),
      description: t('features.community.desc'),
      icon: Users,
      gradient: "bg-health-success"
    },
    {
      title: t('features.appointment.title'),
      description: t('features.appointment.desc'),
      icon: Calendar,
      gradient: "bg-primary-soft"
    },
    {
      title: t('features.reports.title'),
      description: t('features.reports.desc'),
      icon: BarChart3,
      gradient: "bg-health-warning"
    }
  ];

  const developers = [
    {
      name: t('about.ramya.name'),
      role: t('about.ramya.role'),
      bio: t('about.ramya.bio'),
      linkedinUrl: "https://www.linkedin.com/in/ramyaprabhab"
    },
    {
      name: t('about.vaishnavi.name'),
      role: t('about.vaishnavi.role'),
      bio: t('about.vaishnavi.bio'),
      linkedinUrl: "https://www.linkedin.com/in/vaishnavi-soni-27b461331"
    }
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header with Employee Login */}
      <header className="border-b border-border bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
                alt="SheCure Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SheCure
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle onLanguageChange={setLanguage} />
              <Link to="/auth">
                <Button variant="health" size="lg">
                  {t('nav.login')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* About Developers Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {developers.map((developer, index) => (
              <DeveloperCard key={index} {...developer} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <Card className="p-8 max-w-4xl mx-auto text-center bg-gradient-primary shadow-card">
            <Shield className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('footer.mission')}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {t('footer.missionText')}
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">SheCure</span>
          </div>
          <p className="text-muted mb-4">
            {t('footer.tagline')}
          </p>
          <p className="text-sm text-muted">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
