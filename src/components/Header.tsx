import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "See you next time!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-gradient-soft border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer flex-1 min-w-0" onClick={() => user ? navigate('/dashboard') : navigate('/auth')}>
            <img 
              src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
              alt="SheCure Logo" 
              className="h-6 sm:h-8 md:h-10 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground truncate">SheCure</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden xs:block">Women & Children Wellness</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <a href="/dashboard" className="text-sm xl:text-base text-foreground hover:text-primary transition-colors">
              {t('nav.dashboard')}
            </a>
            <a href="/patients" className="text-sm xl:text-base text-foreground hover:text-primary transition-colors">
              {t('nav.patients')}
            </a>
            <a href="/appointments" className="text-sm xl:text-base text-foreground hover:text-primary transition-colors">
              {t('nav.appointments')}
            </a>
            <a href="/reports" className="text-sm xl:text-base text-foreground hover:text-primary transition-colors">
              {t('nav.reports')}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            {user && (
              <Button variant="soft" size="sm" onClick={handleSignOut} className="hidden sm:flex text-xs">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden md:inline">{t('nav.signOut')}</span>
              </Button>
            )}
            <div className="sm:hidden">
              <LanguageToggle />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;