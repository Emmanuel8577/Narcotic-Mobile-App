import * as Speech from 'expo-speech';
import { createContext, useContext, useEffect, useState } from 'react';

const TTSContext = createContext();

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [supportedVoices, setSupportedVoices] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState({
    en: true,
    ha: false,
    kn: false
  });
  const [currentSpeechId, setCurrentSpeechId] = useState(null);

  // Check available voices and languages on component mount
  useEffect(() => {
    checkAvailableVoices();
  }, []);

  const checkAvailableVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setSupportedVoices(voices);
      
      // Check which languages are supported
      const languages = {
        en: voices.some(voice => voice.language.includes('en')),
        ha: voices.some(voice => 
          voice.language.includes('ha') || 
          voice.language.includes('hausa') ||
          voice.language.toLowerCase().includes('hausa')
        ),
        kn: voices.some(voice => 
          voice.language.includes('kn') || 
          voice.language.includes('kanuri') ||
          voice.language.toLowerCase().includes('kanuri')
        )
      };
      
      setAvailableLanguages(languages);
    } catch (error) {
    }
  };

  // Test function - call this to verify TTS works with all languages
  const testTTS = async () => {
   
    const testMessages = {
      en: 'Hello! This is an English test message.',
      ha: 'Sannu! Wannan saƙon gwaji ne na Hausa.',
      kn: 'Ashkhar! Non Kanuri test kuru na.'
    };

    for (const [lang, message] of Object.entries(testMessages)) {
      if (availableLanguages[lang]) {
        try {
          await new Promise((resolve) => {
            Speech.speak(message, {
              language: getLanguageCode(lang),
              onStart: () => console.log(`✅ ${lang.toUpperCase()} TTS test started`),
              onDone: () => {
                resolve();
              },
              onError: (error) => {
                resolve();
              },
            });
          });
          
          // Small delay between tests
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
        }
      } else {
      }
    }
  };

  // Get the appropriate language code
  const getLanguageCode = (language) => {
    const languageMap = {
      en: 'en-US',      // English - United States
      ha: 'ha-NG',      // Hausa - Nigeria
      ha_NG: 'ha-NG',   // Hausa - Nigeria (alternative)
      kn: 'kr-NE',      // Kanuri - Niger (commonly used code)
      kr: 'kr-NE',      // Kanuri alternative
      kn_NG: 'kr-NG',   // Kanuri - Nigeria
    };
    
    return languageMap[language] || 'en-US';
  };

  // Get the best available voice for a language
  const getBestVoiceForLanguage = (language) => {
    if (!supportedVoices.length) return null;

    const languageCode = getLanguageCode(language);
    
    // Try exact match first
    let voice = supportedVoices.find(v => v.language === languageCode);
    
    // Try partial match
    if (!voice) {
      voice = supportedVoices.find(v => 
        v.language.includes(language) ||
        v.language.includes(languageCode.split('-')[0])
      );
    }
    return voice;
  };

  const speak = async (text, language = 'en') => {
    if (!text || !isAudioEnabled) return;

    try {

      // Stop any current speech
      await Speech.stop();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);

      const languageCode = getLanguageCode(language);
      const voice = getBestVoiceForLanguage(language);

      const speakOptions = {
        language: languageCode,
        pitch: 1.0,
        rate: 0.8,
        onStart: () => {
          setIsSpeaking(true);
          setIsPaused(false);
        },
        onDone: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        },
        onError: (error) => {
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        }
      };

      // Add voice if available
      if (voice && voice.identifier) {
        speakOptions.voice = voice.identifier;
      }

      const speechId = await Speech.speak(text, speakOptions);
      setCurrentSpeechId(speechId);

    } catch (error) {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);
    }
  };

  const pause = async () => {
    try {
      if (isSpeaking && !isPaused) {
        await Speech.pause();
        setIsPaused(true);
      }
    } catch (error) {
    }
  };

  const resume = async () => {
    try {
      if (isSpeaking && isPaused) {
        await Speech.resume();
        setIsPaused(false);
      }
    } catch (error) {
    }
  };

  const togglePlayPause = async () => {
    try {
      if (isSpeaking) {
        if (isPaused) {
          await resume();
        } else {
          await pause();
        }
      }
    } catch (error) {
    }
  };

  const stop = async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);
    } catch (error) {
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
  };

  const value = {
    isSpeaking,
    isPaused,
    isAudioEnabled,
    availableLanguages,
    supportedVoices,
    speak,
    pause,
    resume,
    togglePlayPause,
    stop,
    setIsAudioEnabled,
    toggleAudio,
    testTTS,
    checkAvailableVoices
  };

  return (
    <TTSContext.Provider value={value}>
      {children}
    </TTSContext.Provider>
  );
};

// Utility function to check language support
export const checkLanguageSupport = (language) => {
  const supportedLanguages = {
    en: 'English',
    ha: 'Hausa', 
    kn: 'Kanuri'
  };
  
  return {
    code: language,
    name: supportedLanguages[language] || 'Unknown',
    isSupported: true // You can add actual device capability checks here
  };
};