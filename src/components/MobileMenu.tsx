import { useState } from "react";
import { Menu, X, User, LogOut, Home, Users, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/LanguageToggle";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { 
      icon: Home, 
      label: t('nav.dashboard'), 
      path: '/dashboard' 
    },
    { 
      icon: Users, 
      label: t('nav.patients'), 
      path: '/patients' 
    },
    { 
      icon: Calendar, 
      label: t('nav.appointments'), 
      path: '/appointments' 
    },
    { 
      icon: FileText, 
      label: t('nav.reports'), 
      path: '/reports' 
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden p-1.5 sm:p-2">
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/25ad9f45-77ed-4f46-8839-20b7edc24d97.png" 
                alt="SheCure Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">SheCure</h1>
                <p className="text-xs text-muted-foreground">Women & Children Wellness</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-4">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary-soft transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border p-4 space-y-4">
            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Language</span>
              <LanguageToggle />
            </div>

            {/* User Actions */}
            {user && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-card">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground">NGO Employee</p>
                  </div>
                </div>
                
                <Button 
                  variant="soft" 
                  size="sm" 
                  onClick={handleSignOut} 
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.signOut')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;