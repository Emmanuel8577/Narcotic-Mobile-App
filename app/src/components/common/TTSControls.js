import { Ionicons } from '@expo/vector-icons';
import React from 'react';
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
  const { isSpeaking, speak, stop, toggleSpeech } = useTTS();

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

  // Safe text validation
  const safeText = React.useMemo(() => {
    if (text === null || text === undefined) return '';
    return String(text).trim();
  }, [text]);

  const handleToggle = async () => {
    try {
      if (!safeText) {
        console.warn('No text provided to TTSControls');
        return;
      }

      if (isSpeaking) {
        // Stop the speech
        await stop();
        onStop?.();
      } else {
        // Start new speech
        await speak(safeText, language);
        onPlay?.();
      }
    } catch (error) {
      console.error('Error in handleToggle:', error);
    }
  };

  const handleStop = async () => {
    try {
      await stop();
      onStop?.();
    } catch (error) {
      console.error('Error in handleStop:', error);
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

  // Get safe icon name
  const getPlayStopIconName = () => {
    return isSpeaking ? "stop" : "play";
  };

  // Get safe colors
  const getPrimaryColor = () => getThemeValue('colors.primary', '#3B82F6');
  const getBackgroundColor = () => getThemeValue('colors.background', '#F9FAFB');
  const getBorderColor = () => getThemeValue('colors.border', '#E5E7EB');

  // Don't render if no text
  if (!safeText) return null;

  return (
    <View style={styles.container}>
      {/* Play/Stop Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { 
            width: getButtonSize(), 
            height: getButtonSize(),
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
          }
        ]}
        onPress={handleToggle}
        disabled={!safeText}
      >
        <Ionicons
          name={getPlayStopIconName()}
          size={getIconSize()}
          color={getPrimaryColor()}
        />
      </TouchableOpacity>
    </View>
  );
};

// Safe styles with fallbacks
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
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default TTSControls;