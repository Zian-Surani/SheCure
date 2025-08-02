import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

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
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-gradient-soft border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
              alt="SheCure Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">SheCure</h1>
              <p className="text-sm text-muted-foreground">Women & Children Wellness</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              {t('nav.dashboard')}
            </a>
            <a href="/patients" className="text-foreground hover:text-primary transition-colors">
              {t('nav.patients')}
            </a>
            <a href="/appointments" className="text-foreground hover:text-primary transition-colors">
              {t('nav.appointments')}
            </a>
            <a href="/reports" className="text-foreground hover:text-primary transition-colors">
              {t('nav.reports')}
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {user && (
              <Button variant="soft" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                {t('nav.signOut')}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;