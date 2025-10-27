import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

class AudioService {
  constructor() {
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentLanguage = 'en';
    this.voiceType = 'female';
    this.currentText = '';
    this.isTTSAvailable = true;
  }

  // Check TTS availability
  async checkTTSAvailability() {
    try {
      // Try a simple speak test to check availability
      const available = await Speech.getAvailableVoicesAsync();
      this.isTTSAvailable = Array.isArray(available) && available.length > 0;
      console.log('TTS Available:', this.isTTSAvailable, 'Voices:', available?.length);
      return this.isTTSAvailable;
    } catch (error) {
      console.warn('TTS not available on this device:', error);
      this.isTTSAvailable = false;
      return false;
    }
  }

  // Safe text validation
  validateText(text) {
    if (text === null || text === undefined) {
      return '';
    }
    return String(text).trim();
  }

  // Enhanced language to TTS voice mapping with fallbacks
  getVoiceConfig(language, voiceType) {
    // Default voice configuration
    const defaultConfig = {
      rate: 0.8,
      pitch: 1.0,
      voice: null // Let the system choose the best available voice
    };

    const voices = {
      en: {
        female: {
          voice: Platform.OS === 'ios' ? 'com.apple.ttsbundle.Samantha-premium' : null,
          rate: 0.8,
          pitch: 1.1
        },
        male: {
          voice: Platform.OS === 'ios' ? 'com.apple.ttsbundle.Daniel-premium' : null,
          rate: 0.8,
          pitch: 0.9
        }
      },
      ha: {
        female: {
          voice: null, // Use system default for Hausa
          rate: 0.7,
          pitch: 1.0
        },
        male: {
          voice: null, // Use system default for Hausa
          rate: 0.7,
          pitch: 0.9
        }
      },
      kn: {
        female: {
          voice: null, // Use system default for Kanuri
          rate: 0.7,
          pitch: 1.0
        },
        male: {
          voice: null, // Use system default for Kanuri
          rate: 0.7,
          pitch: 0.9
        }
      }
    };

    // Get the voice config with fallbacks
    const languageVoices = voices[language] || voices.en;
    const voiceConfig = languageVoices[voiceType] || languageVoices.female || defaultConfig;
    
    return {
      ...defaultConfig,
      ...voiceConfig
    };
  }

  async speak(text, language = 'en', voiceType = 'female') {
    try {
      // Validate inputs
      const safeText = this.validateText(text);
      if (!safeText) {
        console.warn('No text provided to speak');
        return false;
      }

      // Check TTS availability
      if (!this.isTTSAvailable) {
        console.warn('TTS is not available on this device');
        return false;
      }

      // Stop any currently speaking
      if (this.isSpeaking) {
        await this.stop();
        // Add a small delay to ensure clean stop
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const voiceConfig = this.getVoiceConfig(language, voiceType);
      const languageCode = this.getLanguageCode(language);
      
      // Enhanced options with better error handling
      const options = {
        language: languageCode,
        rate: voiceConfig.rate,
        pitch: voiceConfig.pitch,
        onStart: () => {
          this.isSpeaking = true;
          this.isPaused = false;
          this.currentText = safeText;
          console.log('Speech started:', { language, voiceType, textLength: safeText.length });
        },
        onDone: () => {
          this.isSpeaking = false;
          this.isPaused = false;
          this.currentText = '';
          console.log('Speech completed successfully');
        },
        onError: (error) => {
          this.isSpeaking = false;
          this.isPaused = false;
          this.currentText = '';
          console.error('Speech synthesis error:', error);
        },
        onStopped: () => {
          this.isSpeaking = false;
          this.isPaused = false;
          this.currentText = '';
          console.log('Speech stopped by user');
        }
      };

      // Only set voice if available and on iOS (Android handles voices differently)
      if (Platform.OS === 'ios' && voiceConfig.voice) {
        try {
          // Check if the specific voice is available
          const availableVoices = await Speech.getAvailableVoicesAsync();
          const voiceExists = availableVoices.some(voice => voice.identifier === voiceConfig.voice);
          if (voiceExists) {
            options.voice = voiceConfig.voice;
          } else {
            console.warn('Requested voice not available, using system default');
          }
        } catch (voiceError) {
          console.warn('Could not check available voices:', voiceError);
        }
      }

      console.log('Speaking with options:', { 
        language: options.language, 
        rate: options.rate, 
        pitch: options.pitch,
        hasVoice: !!options.voice
      });

      // Store current state
      this.currentText = safeText;
      this.currentLanguage = language;
      this.voiceType = voiceType;

      // Start speaking
      Speech.speak(safeText, options);
      return true;
      
    } catch (error) {
      console.error('Speech synthesis initialization error:', error);
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = '';
      return false;
    }
  }

  getLanguageCode(language) {
    const codes = {
      en: 'en-US',
      ha: 'ha-NG', // Hausa - Nigeria
      kn: 'kr-NE'  // Kanuri - Niger (closest available)
    };
    return codes[language] || 'en-US';
  }

  async stop() {
    try {
      if (!this.isTTSAvailable) return false;

      Speech.stop();
      // Reset states regardless of stop success
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = '';
      console.log('Speech stopped');
      return true;
    } catch (error) {
      console.error('Stop speech error:', error);
      // Still reset states even if stop fails
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = '';
      return false;
    }
  }

  async pause() {
    try {
      if (!this.isTTSAvailable || !this.isSpeaking || this.isPaused) return false;
      
      await Speech.pause();
      this.isPaused = true;
      console.log('Speech paused');
      return true;
    } catch (error) {
      console.error('Pause speech error:', error);
      return false;
    }
  }

  async resume() {
    try {
      if (!this.isTTSAvailable || !this.isSpeaking || !this.isPaused) return false;
      
      await Speech.resume();
      this.isPaused = false;
      console.log('Speech resumed');
      return true;
    } catch (error) {
      console.error('Resume speech error:', error);
      return false;
    }
  }

  async togglePlayPause() {
    try {
      if (!this.isSpeaking) return false;

      if (this.isPaused) {
        return await this.resume();
      } else {
        return await this.pause();
      }
    } catch (error) {
      console.error('Toggle play/pause error:', error);
      return false;
    }
  }

  // Get current speaking state
  async getSpeakingState() {
    try {
      const speaking = await Speech.isSpeakingAsync();
      return speaking;
    } catch (error) {
      console.error('Error getting speaking state:', error);
      return this.isSpeaking;
    }
  }

  // Get available voices
  async getAvailableVoices() {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      return voices || [];
    } catch (error) {
      console.error('Error getting available voices:', error);
      return [];
    }
  }

  setVoiceType(voiceType) {
    if (voiceType === 'male' || voiceType === 'female') {
      this.voiceType = voiceType;
      console.log('Voice type set to:', voiceType);
    } else {
      console.warn('Invalid voice type:', voiceType);
    }
  }

  setLanguage(language) {
    if (language === 'en' || language === 'ha' || language === 'kn') {
      this.currentLanguage = language;
      console.log('Language set to:', language);
    } else {
      console.warn('Invalid language:', language);
    }
  }

  isSpeakingNow() {
    return this.isSpeaking;
  }

  isPausedNow() {
    return this.isPaused;
  }

  getCurrentText() {
    return this.currentText;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getCurrentVoiceType() {
    return this.voiceType;
  }

  // Cleanup method
  destroy() {
    this.stop().catch(error => {
      console.error('Error during cleanup:', error);
    });
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentText = '';
  }
}

// Create singleton instance
const audioService = new AudioService();

// Initialize TTS availability check
audioService.checkTTSAvailability().catch(error => {
  console.error('Failed to initialize TTS availability check:', error);
});

export default audioService;