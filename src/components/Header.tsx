import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/LanguageToggle";

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
            <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => user ? navigate('/dashboard') : navigate('/auth')}>
            <img 
              src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
              alt="SheCure Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">SheCure</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Women & Children Wellness</p>
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

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            {user && (
              <Button variant="soft" size="sm" onClick={handleSignOut} className="hidden sm:flex">
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">{t('nav.signOut')}</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;