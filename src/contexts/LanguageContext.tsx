'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    app: {
      title: "People's Justice",
      subtitle: "Legal Empowerment for Every Indian",
      price: "₹99 (One-time)",
      mission: "Make law simple, accessible, and usable for people without lawyers."
    },
    modules: {
      rti: {
        title: "RTI Generator",
        description: "File Right to Information applications easily",
        features: ["Pre-built templates", "Department auto-selection", "Hindi & English support"]
      },
      rights: {
        title: "Know Your Rights",
        description: "Learn your legal rights in simple language",
        features: ["Labour rights", "Women rights", "Police rights", "Consumer rights"]
      },
      notice: {
        title: "Legal Notice",
        description: "Create professional legal notices",
        features: ["Payment disputes", "Property issues", "Service negligence", "Fraud cases"]
      },
      complaint: {
        title: "Consumer Complaint",
        description: "Fight fraud and service issues",
        features: ["E-commerce fraud", "Payment scams", "Product issues", "Service disputes"]
      }
    },
    common: {
      getStarted: "Get Started",
      back: "Back",
      next: "Next",
      save: "Save",
      download: "Download",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      submit: "Submit",
      close: "Close"
    }
  },
  hi: {
    app: {
      title: "पीपल्स जस्टिस",
      subtitle: "हर भारतीय के लिए कानूनी सशक्तिकरण",
      price: "₹99 (एक बार)",
      mission: "कानून को बिना वकील के लोगों के लिए सरल, सुलभ और उपयोगी बनाएं।"
    },
    modules: {
      rti: {
        title: "आरटीआई जेनरेटर",
        description: "सूचना का अधिकार आवेदन आसानी से दाखिल करें",
        features: ["पूर्व-निर्मित टेम्प्लेट", "विभाग स्वचालित चयन", "हिंदी और अंग्रेजी समर्थन"]
      },
      rights: {
        title: "अपने अधिकार जानें",
        description: "सरल भाषा में अपने कानूनी अधिकार जानें",
        features: ["श्रम अधिकार", "महिला अधिकार", "पुलिस अधिकार", "उपभोक्ता अधिकार"]
      },
      notice: {
        title: "कानूनी नोटिस",
        description: "पेशेवर कानूनी नोटिस बनाएं",
        features: ["भुगतान विवाद", "संपत्ति मुद्दे", "सेवा लापरवाही", "धोखाधड़ी के मामले"]
      },
      complaint: {
        title: "उपभोक्ता शिकायत",
        description: "धोखाधड़ी और सेवा समस्याओं से लड़ें",
        features: ["ई-कॉमर्स धोखाधड़ी", "भुगतान घोटाले", "उत्पाद समस्याएं", "सेवा विवाद"]
      }
    },
    common: {
      getStarted: "शुरू करें",
      back: "पीछे",
      next: "आगे",
      save: "सेव करें",
      download: "डाउनलोड",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      cancel: "रद्द करें",
      submit: "जमा करें",
      close: "बंद करें"
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('peoples-justice-language')
      return (saved === 'hi' || saved === 'en') ? saved : 'en'
    }
    return 'en'
  })

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('peoples-justice-language', lang)
    }
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}