import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTTS } from '../../context/TTSContext';
import { theme } from '../../styles/theme';

const TTSControls = ({ 
  text, 
  language = 'en',
  size = 'medium',
  onPlay,
  onStop 
}) => {
  const { isSpeaking, speak, stop } = useTTS();

  // Safe text validation - MUST be before any conditional returns
  const safeText = useMemo(() => {
    if (text === null || text === undefined) return '';
    return String(text).trim();
  }, [text]);

  // Debug render - MUST be before any conditional returns
  useEffect(() => {
    console.log('TTSControls - isSpeaking changed:', isSpeaking);
  }, [isSpeaking]);

  // Safe theme access with fallbacks
  const getThemeValue = (path, fallback) => {
    try {
      const value = path.split('.').reduce((obj, key) => obj?.[key], theme);
      return value || fallback;
    } catch (error) {
      console.warn(`Theme access error for path "${path}":`, error);
      return fallback;
    }
  };

  const handleToggle = async () => {
    try {
      console.log('TTSControls - handleToggle called, isSpeaking:', isSpeaking);
      
      if (!safeText) {
        console.warn('No text provided to TTSControls');
        return;
      }

      if (isSpeaking) {
        // Stop the speech immediately
        console.log('Stopping speech...');
        await stop();
        console.log('Speech stopped');
        if (typeof onStop === 'function') {
          onStop();
        }
      } else {
        // Start new speech
        console.log('Starting speech...');
        await speak(safeText, language);
        console.log('Speech started');
        if (typeof onPlay === 'function') {
          onPlay();
        }
      }
    } catch (error) {
      console.error('Error in handleToggle:', error);
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 32;
      default: return 24;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small': return 36;
      case 'large': return 56;
      default: return 44;
    }
  };

  // Get icon name based on speaking state
  const getIconName = () => {
    return isSpeaking ? "stop-circle" : "play-circle";
  };

  // Get safe colors
  const getPrimaryColor = () => getThemeValue('colors.primary', '#3B82F6');
  const getErrorColor = () => getThemeValue('colors.error', '#EF4444');
  const getBackgroundColor = () => getThemeValue('colors.background', '#F9FAFB');
  const getBorderColor = () => getThemeValue('colors.border', '#E5E7EB');

  // NOW we can do conditional returns - AFTER all hooks
  if (!safeText) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { 
            width: getButtonSize(), 
            height: getButtonSize(),
            backgroundColor: isSpeaking 
              ? getErrorColor() + '15' // Light red background when playing
              : getBackgroundColor(),
            borderColor: isSpeaking 
              ? getErrorColor() 
              : getBorderColor(),
          }
        ]}
        onPress={handleToggle}
        disabled={!safeText}
        activeOpacity={0.7}
      >
        <Ionicons
          name={getIconName()}
          size={getIconSize()}
          color={isSpeaking ? getErrorColor() : getPrimaryColor()}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default TTSControls;