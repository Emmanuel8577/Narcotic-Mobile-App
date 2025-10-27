// contexts/LanguageContext.js
import { createContext, useContext, useEffect, useState } from 'react';

// Import language files
import en from '../locales/en.json';
import ha from '../locales/ha.json';
import kn from '../locales/kn.json';

// Import data files
import { drugData as drugDataEn } from '../data/drugData';
import { drugData as drugDataHa } from '../data/drugDataHa';
import { drugData as drugDataKn } from '../data/drugDataKn';

import { quizData as quizDataEn } from '../data/quizData';
import { quizData as quizDataHa } from '../data/quizDataHa';
import { quizData as quizDataKn } from '../data/quizDataKn';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for dynamic data - Initialize with English data
  const [drugData, setDrugData] = useState(drugDataEn || []);
  const [quizData, setQuizData] = useState(quizDataEn || []);

  const translations = {
    en,
    ha,
    kn
  };

  const dataSets = {
    en: { 
      drugData: drugDataEn || [], 
      quizData: quizDataEn || []
    },
    ha: { 
      drugData: drugDataHa || [], 
      quizData: quizDataHa || []
    },
    kn: { 
      drugData: drugDataKn || [], 
      quizData: quizDataKn || []
    }
  };

  // Update data when language changes
  useEffect(() => {
    console.log('Language changed to:', language);
    
    const currentData = dataSets[language] || dataSets.en;
    
    // Validate data before setting
    const validDrugData = Array.isArray(currentData.drugData) ? currentData.drugData : [];
    const validQuizData = Array.isArray(currentData.quizData) ? currentData.quizData : [];
    
    console.log('Setting drug data:', {
      language,
      count: validDrugData.length,
      firstDrug: validDrugData[0]?.name
    });
    
    setDrugData(validDrugData);
    setQuizData(validQuizData);
    setIsLoading(false);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || `[${key}]`;
  };

  const changeLanguage = (lang) => {
    console.log('Changing language to:', lang);
    if (translations[lang]) {
      setLanguage(lang);
    } else {
      console.warn('Language not supported:', lang);
      setLanguage('en');
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
  };

  const getShuffledQuestions = () => {
    if (!quizData || !Array.isArray(quizData)) {
      console.warn('Quiz data not available');
      return [];
    }

    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    return shuffled.map(question => {
      if (!question || !question.options) return question;
      
      return {
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5)
      };
    });
  };

  const getDrugById = (id) => {
    if (!drugData || !Array.isArray(drugData)) {
      console.warn('Drug data not available');
      return null;
    }
    return drugData.find(drug => drug?.id === id);
  };

  const getDrugsByRiskLevel = (riskLevel) => {
    if (!drugData || !Array.isArray(drugData)) {
      console.warn('Drug data not available');
      return [];
    }
    return drugData.filter(drug => drug?.riskLevel === riskLevel);
  };

  const value = {
    language,
    t,
    changeLanguage,
    isOnboardingCompleted,
    completeOnboarding,
    isLoading,
    drugData,
    quizData,
    getShuffledQuestions,
    getDrugById,
    getDrugsByRiskLevel
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};