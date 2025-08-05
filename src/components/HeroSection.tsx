import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/health-hero.jpg";
const HeroSection = () => {
  const {
    t
  } = useLanguage();
  const navigate = useNavigate();
  const handleStartMonitoring = () => {
    navigate("/auth");
  };
  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="bg-gradient-soft py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t('hero.title')} 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> {t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <Button variant="health" size="mobile" className="sm:size-lg" onClick={handleStartMonitoring}>
                <Heart className="h-5 w-5 mr-2" />
                {t('hero.startMonitoring')}
              </Button>
              <Button variant="soft" size="mobile" className="sm:size-lg" onClick={handleLearnMore}>
                {t('hero.learnMore')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="bg-health-pink p-2 sm:p-3 rounded-lg w-fit mx-auto mb-1 sm:mb-2">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">102+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('hero.patientsServed')}</p>
              </div>
              <div className="text-center">
                <div className="bg-health-purple p-2 sm:p-3 rounded-lg w-fit mx-auto mb-1 sm:mb-2">
                  <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">98%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('hero.successRate')}</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-soft p-2 sm:p-3 rounded-lg w-fit mx-auto mb-1 sm:mb-2">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">24/7</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('hero.careAvailable')}</p>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl sm:rounded-2xl transform rotate-3"></div>
            <img src={heroImage} alt="Healthcare professionals caring for women and children" className="relative rounded-xl sm:rounded-2xl shadow-card w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;