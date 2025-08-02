import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  onLanguageChange?: (language: 'en' | 'hi') => void;
}

const LanguageToggle = ({ onLanguageChange }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
};

export default LanguageToggle;