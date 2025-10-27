import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTTS } from '../../context/TTSContext';
import { theme } from '../../styles/theme';
import Card from '../common/Cards';

const DrugCard = ({ drug, onPress }) => {
  const { speak, isSpeaking, isAudioEnabled } = useTTS();

  const handlePlayAudio = () => {
    if (!isAudioEnabled || !drug) return;

    const drugText = `${drug.name}. ${drug.type}. ${drug.riskLevel} risk. ${drug.shortDescription}`;
    console.log('🔊 Playing drug audio:', drugText);
    
    speak(drugText);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <Card onPress={onPress} style={{ marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {drug.image && (
          <Image 
            source={drug.image} 
            style={{
              width: 60,
              height: 60,
              borderRadius: theme.borderRadius.sm,
              marginRight: theme.spacing.md,
            }}
          />
        )}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...theme.typography.h3, color: theme.colors.primary, flex: 1 }}>
              {drug.name}
            </Text>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering card press
                handlePlayAudio();
              }} 
              style={{ padding: 8 }}
            >
              <Ionicons 
                name={isSpeaking ? "volume-high" : "volume-medium"} 
                size={22} 
                color={isSpeaking ? theme.colors.primary : theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          <Text style={{ ...theme.typography.caption, marginTop: theme.spacing.xs }}>
            {drug.type} • {drug.riskLevel}
          </Text>
          <Text 
            style={{ 
              ...theme.typography.body, 
              marginTop: theme.spacing.sm,
              fontSize: 14,
            }}
            numberOfLines={2}
          >
            {drug.shortDescription}
          </Text>
        </View>
        <View style={{
          backgroundColor: getRiskColor(drug.riskLevel),
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.sm,
        }}>
          <Text style={{
            color: theme.colors.white,
            fontSize: 12,
            fontWeight: 'bold',
          }}>
            {drug.riskLevel.toUpperCase()}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default DrugCard;