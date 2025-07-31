import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react";
import heroImage from "@/assets/health-hero.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-soft py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Comprehensive Health Records for 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Women & Children</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Empowering communities through accessible healthcare monitoring, 
                maternal wellness tracking, and child development support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="health" size="lg">
                <Heart className="h-5 w-5" />
                Start Monitoring
              </Button>
              <Button variant="soft" size="lg">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-health-pink p-3 rounded-lg w-fit mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">2,500+</p>
                <p className="text-sm text-muted-foreground">Patients Served</p>
              </div>
              <div className="text-center">
                <div className="bg-health-purple p-3 rounded-lg w-fit mx-auto mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-soft p-3 rounded-lg w-fit mx-auto mb-2">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Care Available</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl transform rotate-3"></div>
            <img 
              src={heroImage} 
              alt="Healthcare professionals caring for women and children"
              className="relative rounded-2xl shadow-card w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;