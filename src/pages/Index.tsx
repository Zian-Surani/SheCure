import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="text-center py-8">
        <Link to="/auth">
          <Button variant="health" size="lg">
            NGO Employee Login
          </Button>
        </Link>
      </div>
      <main className="container mx-auto px-4 py-12">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
