import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from './useLanguage';

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

export const useTranslation = () => {
  const { language } = useLanguage();
  const [cache, setCache] = useState<TranslationCache>({});
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text: string, targetLanguage: string = language): Promise<string> => {
    // Return original text if target language is English
    if (targetLanguage === 'en') {
      return text;
    }

    // Check cache first
    if (cache[text] && cache[text][targetLanguage]) {
      return cache[text][targetLanguage];
    }

    try {
      setIsTranslating(true);
      
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: {
          text,
          targetLanguage,
          sourceLanguage: 'en'
        }
      });

      if (error) {
        console.error('Translation error:', error);
        return text; // Return original text if translation fails
      }

      const translatedText = data.translatedText;

      // Update cache
      setCache(prev => ({
        ...prev,
        [text]: {
          ...prev[text],
          [targetLanguage]: translatedText
        }
      }));

      return translatedText;
    } catch (error) {
      console.error('Translation service error:', error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  const translatePatientData = async (patient: any) => {
    if (language === 'en') return patient;

    const translatedPatient = { ...patient };
    
    try {
      if (patient.condition) {
        translatedPatient.condition = await translateText(patient.condition);
      }
      if (patient.notes) {
        translatedPatient.notes = await translateText(patient.notes);
      }
    } catch (error) {
      console.error('Error translating patient data:', error);
    }

    return translatedPatient;
  };

  const translateBatch = async (texts: string[], targetLanguage: string = language): Promise<string[]> => {
    if (targetLanguage === 'en') {
      return texts;
    }

    try {
      const translations = await Promise.all(
        texts.map(text => translateText(text, targetLanguage))
      );
      return translations;
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Return original texts if translation fails
    }
  };

  return {
    translateText,
    translatePatientData,
    translateBatch,
    isTranslating,
    cache
  };
};