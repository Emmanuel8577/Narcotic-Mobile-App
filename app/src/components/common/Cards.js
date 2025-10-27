import { TouchableOpacity, View } from 'react-native';
import { useTTS } from '../../context/TTSContext';
import { theme } from '../../styles/theme';

const Card = ({ 
  children, 
  style, 
  onPress, 
  variant = 'elevated',
  audioText,
  audioLanguage = 'en',
  enableAudio = true,
  ...props 
}) => {
  const { speak, isAudioEnabled } = useTTS();

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...(variant === 'elevated' ? theme.shadows.md : {}),
    ...(variant === 'outlined' ? {
      borderWidth: 1,
      borderColor: '#E0E0E0',
    } : {}),
  };

  const handlePlayAudio = () => {
    if (audioText && enableAudio && isAudioEnabled) {
      speak(audioText, audioLanguage);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    handlePlayAudio();
  };

  if (onPress) {
    return (
      <TouchableOpacity 
        style={[cardStyle, style]} 
        onPress={handlePress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;