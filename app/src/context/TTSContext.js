import * as Speech from 'expo-speech';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

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

  useEffect(() => {
    checkAvailableVoices();
  }, []);

  const checkAvailableVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setSupportedVoices(voices);
      
      console.log('Available voices:', voices);
      
      const languages = {
        en: voices.some(voice => 
          voice.language.includes('en') || 
          voice.language.includes('US') ||
          voice.language.includes('GB')
        ),
        ha: voices.some(voice => 
          voice.language.includes('ha') || 
          voice.language.includes('HA') ||
          voice.name?.toLowerCase().includes('hausa') ||
          voice.language?.toLowerCase().includes('hausa')
        ),
        kn: voices.some(voice => 
          voice.language.includes('kn') || 
          voice.language.includes('KN') ||
          voice.name?.toLowerCase().includes('kanuri') ||
          voice.language?.toLowerCase().includes('kanuri')
        )
      };
      
      console.log('Detected language support:', languages);
      setAvailableLanguages(languages);
    } catch (error) {
      console.error('Error checking available voices:', error);
    }
  };

  // Enhanced language codes with male voice preference
  const getLanguageCode = (language) => {
    const languageMap = {
      // English - Male preferred
      en: 'en-US',
      
      // Hausa - Male voice preference
      ha: 'ha-NG',
      ha_NG: 'ha-NG',
      ha_NE: 'ha-NE',
      
      // Kanuri - Male voice preference
      kn: 'kr',
      kr: 'kr',
      kn_NG: 'kr-NG',
    };
    
    return languageMap[language] || 'en-US';
  };

  // Find male voices specifically for African languages
  const getMaleVoiceForLanguage = (language) => {
    if (!supportedVoices.length) return null;

    const languageCode = getLanguageCode(language);
    
    console.log(`Looking for MALE voice for ${language} (code: ${languageCode})`);
    
    // Priority: Male voices for African languages
    const maleVoices = supportedVoices.filter(voice => {
      // Try to identify male voices
      const isMale = 
        voice.name?.toLowerCase().includes('male') ||
        voice.name?.toLowerCase().includes('man') ||
        voice.identifier?.toLowerCase().includes('male') ||
        voice.gender === 'male' ||
        !voice.name?.toLowerCase().includes('female');
      
      return isMale;
    });

    let voice = null;

    // 1. Try exact male voice match for the language
    voice = maleVoices.find(v => v.language === languageCode);

    // 2. Try male voice with language family match
    if (!voice) {
      voice = maleVoices.find(v => {
        const voiceLang = v.language.toLowerCase();
        return (
          voiceLang.includes(language) ||
          voiceLang.includes(languageCode.split('-')[0])
        );
      });
    }

    // 3. Try any male African regional voice
    if (!voice) {
      voice = maleVoices.find(v => {
        const voiceLang = v.language.toLowerCase();
        return (
          voiceLang.includes('ng') || // Nigeria
          voiceLang.includes('ne') || // Niger
          voiceLang.includes('gh') || // Ghana
          voiceLang.includes('af')    // Africa
        );
      });
    }

    // 4. Fallback to any male voice
    if (!voice && maleVoices.length > 0) {
      voice = maleVoices[0];
    }

    if (voice) {
      console.log(`Found MALE voice for ${language}:`, voice.name);
    } else {
      console.log(`No male voice found for ${language}, will use default`);
    }
    
    return voice;
  };

  // Enhanced speech parameters for male African language pronunciation
  const getMaleSpeechParameters = (language) => {
    // Base parameters for male voice - slower, more deliberate
    const baseMaleParams = {
      pitch: 0.8,  // Lower pitch for male voice
      rate: 0.7    // Slower rate for clarity
    };

    // Language-specific adjustments for African male voices
    switch (language) {
      case 'ha': // Hausa Male
        return {
          ...baseMaleParams,
          pitch: 0.75,  // Even lower for Hausa male
          rate: 0.65,   // Slower for Hausa tonal clarity
        };
      
      case 'kn': // Kanuri Male
        return {
          ...baseMaleParams,
          pitch: 0.78,  // Slightly higher than Hausa but still male
          rate: 0.6,    // Slowest for Kanuri complex phonetics
        };
      
      default: // English Male
        return {
          ...baseMaleParams,
          pitch: 0.85,
          rate: 0.75,
        };
    }
  };

  // Enhanced text preprocessing for male African speech patterns
  const preprocessTextForMaleSpeech = (text, language) => {
    if (!text) return text;
    
    let processedText = text.trim();
    
    // Add slight pauses for better male speech rhythm
    const addSpeechPauses = (text) => {
      return text
        .replace(/\./g, '. ')    // Add space after periods
        .replace(/,/g, ', ')     // Add space after commas
        .replace(/\?/g, '? ')    // Add space after questions
        .replace(/\!/g, '! ')    // Add space after exclamations
        .replace(/\s+/g, ' ');   // Normalize spaces
    };

    switch (language) {
      case 'ha': // Hausa Male preprocessing
        processedText = processedText
          // Hausa specific pronunciation for male voice
          .replace(/'y/g, 'ƴ')  
          .replace(/'k/g, 'ƙ')
          .replace(/ts/g, 'ts') 
          .replace(/sh/g, 'sh')
          .replace(/r/g, 'r')   // Rolled r for male Hausa
          .replace(/h/g, 'h')   // Emphasized h sound
          .toLowerCase();
        break;
        
      case 'kn': // Kanuri Male preprocessing
        processedText = processedText
          // Kanuri male pronunciation emphasis
          .replace(/ng/g, 'ŋ')  
          .replace(/sh/g, 'ʃ')  
          .replace(/kh/g, 'x')  
          .replace(/r/g, 'r')   // Rolled r for male Kanuri
          .replace(/k/g, 'k')   // Emphasized k sounds
          .toLowerCase();
        break;
        
      default:
        // English male preprocessing
        processedText = processedText;
        break;
    }
    
    // Add speech pauses for all languages
    processedText = addSpeechPauses(processedText);
    
    return processedText;
  };

  // Main speak function with male voice emphasis
  const speak = async (text, language = 'en') => {
    if (!text || !isAudioEnabled) return;

    try {
      // Stop any current speech first
      if (isSpeaking) {
        await Speech.stop();
      }

      const languageCode = getLanguageCode(language);
      const voice = getMaleVoiceForLanguage(language);
      const speechParams = getMaleSpeechParameters(language);

      console.log(`Speaking ${language} with MALE voice:`, {
        textLength: text.length,
        languageCode,
        hasMaleVoice: !!voice,
        speechParams
      });

      const speakOptions = {
        language: languageCode,
        ...speechParams,
        onStart: () => {
          console.log(`Male speech started for ${language}`);
          setIsSpeaking(true);
          setIsPaused(false);
        },
        onDone: () => {
          console.log(`Male speech completed for ${language}`);
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        },
        onError: (error) => {
          console.error('Male speech error:', error);
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        },
        onStopped: () => {
          console.log(`Male speech stopped for ${language}`);
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSpeechId(null);
        }
      };

      // Add male voice if available
      if (voice && voice.identifier) {
        speakOptions.voice = voice.identifier;
        console.log(`Using MALE voice: ${voice.name} for ${language}`);
      } else {
        console.log(`Using default system voice for ${language} (male parameters applied)`);
      }

      // Pre-process text for male African speech patterns
      const processedText = preprocessTextForMaleSpeech(text, language);
      
      const speechId = await Speech.speak(processedText, speakOptions);
      setCurrentSpeechId(speechId);

    } catch (error) {
      console.error('Male speak error:', error);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);
    }
  };

  // Test function with male voice samples
  const testMaleTTS = async () => {
    const testMessages = {
      en: 'Hello friends. This is an English test message for drug education. We will speak slowly and clearly.',
      ha: 'Sannu da zuwa. Wannan saƙon gwaji ne na ilimin magunguna. Muna koyon illolin shan kwayoyi a hankali da fito.',
      kn: 'Ashkhar kusurwu. Non Kanuri test kuru na. Nda ajiya kuru nda nda ajiya kaska. A jiye a hankali.'
    };

    console.log('Starting MALE TTS test for all languages...');

    for (const [lang, message] of Object.entries(testMessages)) {
      if (availableLanguages[lang]) {
        try {
          console.log(`Testing ${lang.toUpperCase()} MALE TTS...`);
          
          await new Promise((resolve) => {
            let resolved = false;
            
            const voice = getMaleVoiceForLanguage(lang);
            const params = getMaleSpeechParameters(lang);
            
            Speech.speak(message, {
              language: getLanguageCode(lang),
              ...params,
              voice: voice?.identifier,
              onStart: () => console.log(`🎯 ${lang.toUpperCase()} MALE TTS started`),
              onDone: () => {
                if (!resolved) {
                  console.log(`✅ ${lang.toUpperCase()} MALE TTS completed`);
                  resolved = true;
                  resolve();
                }
              },
              onError: (error) => {
                if (!resolved) {
                  console.error(`❌ Error testing ${lang} male TTS:`, error);
                  resolved = true;
                  resolve();
                }
              }
            });
          });
          
          // Longer wait between tests for male speech rhythm
          await new Promise(resolve => setTimeout(resolve, 3000));
          
        } catch (error) {
          console.error(`Error in male TTS test for ${lang}:`, error);
        }
      } else {
        console.log(`⚠️ ${lang.toUpperCase()} male TTS not available`);
      }
    }
    
    console.log('Male TTS test completed');
  };

  // Enhanced language support with voice gender info
  const checkLanguageSupport = (language) => {
    const languageInfo = {
      en: { 
        name: 'English', 
        native: 'English', 
        supported: availableLanguages.en,
        preferredGender: 'male'
      },
      ha: { 
        name: 'Hausa', 
        native: 'Hausa', 
        supported: availableLanguages.ha,
        preferredGender: 'male'
      },
      kn: { 
        name: 'Kanuri', 
        native: 'Kanuri', 
        supported: availableLanguages.kn,
        preferredGender: 'male'
      }
    };
    
    return languageInfo[language] || { 
      name: 'Unknown', 
      native: 'Unknown', 
      supported: false,
      preferredGender: 'male'
    };
  };

  const stop = async () => {
    try {
      console.log('Stopping male speech...');
      await Speech.stop();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);
    } catch (error) {
      console.error('Error stopping male speech:', error);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpeechId(null);
    }
  };

  // Pause function - only available on iOS
  const pause = async () => {
    if (Platform.OS !== 'ios') {
      console.warn('Pause is not supported on Android');
      return;
    }
    
    try {
      if (isSpeaking && !isPaused) {
        await Speech.pause();
        setIsPaused(true);
        console.log('Male speech paused');
      }
    } catch (error) {
      console.error('Error pausing male speech:', error);
    }
  };

  // Resume function - only available on iOS
  const resume = async () => {
    if (Platform.OS !== 'ios') {
      console.warn('Resume is not supported on Android');
      return;
    }
    
    try {
      if (isSpeaking && isPaused) {
        await Speech.resume();
        setIsPaused(false);
        console.log('Male speech resumed');
      }
    } catch (error) {
      console.error('Error resuming male speech:', error);
    }
  };

  // Toggle play/pause - only works on iOS, on Android just stops
  const togglePlayPause = async () => {
    if (Platform.OS !== 'ios') {
      // On Android, just stop the speech
      if (isSpeaking) {
        await stop();
      }
      return;
    }
    
    try {
      if (isSpeaking) {
        if (isPaused) {
          await resume();
        } else {
          await pause();
        }
      }
    } catch (error) {
      console.error('Error toggling male speech play/pause:', error);
    }
  };

  // Toggle audio enabled state
  const toggleAudio = () => {
    setIsAudioEnabled(prev => {
      const newState = !prev;
      console.log(`Audio ${newState ? 'enabled' : 'disabled'}`);
      return newState;
    });
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
    testTTS: testMaleTTS,
    checkAvailableVoices,
    checkLanguageSupport,
    supportsPauseResume: Platform.OS === 'ios',
    hasMaleVoice: (language) => !!getMaleVoiceForLanguage(language),
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
    en: { name: 'English', native: 'English' },
    ha: { name: 'Hausa', native: 'Hausa' }, 
    kn: { name: 'Kanuri', native: 'Kanuri' }
  };
  
  const info = supportedLanguages[language] || { name: 'Unknown', native: 'Unknown' };
  
  return {
    code: language,
    name: info.name,
    native: info.native,
    isSupported: true
  };
};