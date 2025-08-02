import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ca27b8da-710e-4c79-b1fa-81e7f6ae0e06.png" 
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
              Dashboard
            </a>
            <a href="/patients" className="text-foreground hover:text-primary transition-colors">
              Patients
            </a>
            <a href="/appointments" className="text-foreground hover:text-primary transition-colors">
              Appointments
            </a>
            <a href="/reports" className="text-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {user && (
              <Button variant="soft" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
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