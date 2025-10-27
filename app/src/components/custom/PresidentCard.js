import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTTS } from '../../context/TTSContext';
import { theme } from '../../styles/theme';
import Card from '../common/Cards';

const PresidentCard = ({ president, onPress }) => {
  const { speak, isAudioEnabled } = useTTS();
  const [isExpanded, setIsExpanded] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Device dimension calculations
  const isSmallScreen = screenWidth < 375; // iPhone SE, small Android devices (320px-374px)
  const isMediumScreen = screenWidth >= 375 && screenWidth < 414; // Standard phones (375px-413px)
  const isLargeScreen = screenWidth >= 414 && screenWidth < 768; // Large phones (414px-767px)
  const isTablet = screenWidth >= 768; // Tablets (768px and above)

  // Responsive values based on screen dimensions
  const responsive = {
    // Card spacing - REDUCED margins to increase card width
    cardMargin: isSmallScreen ? theme.spacing.sm : 
                isTablet ? theme.spacing.lg : theme.spacing.md,
    cardPadding: isSmallScreen ? theme.spacing.md : 
                 isTablet ? theme.spacing.xl : theme.spacing.lg,
    
    // Image dimensions
    imageWidth: isSmallScreen ? 75 : 
                isTablet ? 110 : 90,
    imageHeight: isSmallScreen ? 95 : 
                 isTablet ? 130 : 110,
    
    // Font sizes
    nameFontSize: isSmallScreen ? 16 : 
                  isTablet ? 20 : 18,
    schoolFontSize: isSmallScreen ? 13 : 
                    isTablet ? 15 : 14,
    roleFontSize: isSmallScreen ? 12 : 
                  isTablet ? 14 : 13,
    bioFontSize: isSmallScreen ? 12 : 
                 isTablet ? 14 : 13,
    badgeFontSize: isSmallScreen ? 10 : 
                   isTablet ? 12 : 11,
    
    // Icon sizes
    iconSize: isSmallScreen ? 16 : 
              isTablet ? 20 : 18,
    chevronSize: isSmallScreen ? 12 : 
                 isTablet ? 16 : 14,
    
    // Spacing
    contentMargin: isSmallScreen ? theme.spacing.md : 
                   isTablet ? theme.spacing.xl : theme.spacing.lg,
    badgePadding: isSmallScreen ? theme.spacing.sm : 
                  isTablet ? theme.spacing.lg : theme.spacing.md, // Reduced padding
    
    // Decorative element
    decorSize: isSmallScreen ? 40 : 
               isTablet ? 60 : 50,
  };

  const handlePlayAudio = () => {
    if (!isAudioEnabled) return;
    
    const audioText = `${president.name}, ${president.role} from ${president.school}. Tenure: ${president.tenure}. ${president.achievements} achievements. ${president.bio}`;
    speak(audioText);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={{ 
      marginHorizontal: responsive.cardMargin, // Reduced margins for wider cards
      marginBottom: theme.spacing.lg,
    }}>
      <Card 
        onPress={onPress}
        style={{ 
          marginBottom: theme.spacing.lg,
          padding: responsive.cardPadding,
          borderRadius: theme.borderRadius.xl,
          backgroundColor: theme.colors.white,
          ...theme.shadows.lg,
          borderLeftWidth: 4,
          borderLeftColor: theme.colors.primary,
          maxWidth: isTablet ? 800 : '100%', // Increased max width for tablets
          alignSelf: 'center',
          width: '100%',
          // Added minWidth to ensure proper sizing
          minWidth: isSmallScreen ? screenWidth - 40 : 'auto',
        }}
      >
        {/* Header Section */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* President Image */}
          <Image 
            source={president.image} 
            style={{
              width: responsive.imageWidth,
              height: responsive.imageHeight,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 3,
              borderColor: theme.colors.primaryLight,
            }}
          />
          
          {/* Content */}
          <View style={{ 
            flex: 1, 
            marginLeft: responsive.contentMargin,
            minWidth: 0, // Important: allows text to wrap properly
          }}>
            {/* Name and Audio Button */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: theme.spacing.xs,
              flexWrap: 'wrap',
            }}>
              <Text style={{ 
                ...theme.typography.h3, 
                color: theme.colors.primary,
                fontWeight: '800',
                flex: 1,
                fontSize: responsive.nameFontSize,
                flexShrink: 1, // Allows text to shrink if needed
              }}>
                {president.name}
              </Text>
              <TouchableOpacity 
                onPress={handlePlayAudio}
                style={{
                  padding: 8,
                  backgroundColor: `rgba(59, 130, 246, 0.1)`,
                  borderRadius: theme.borderRadius.round,
                  marginLeft: theme.spacing.xs,
                  flexShrink: 0, // Prevents button from shrinking
                }}
              >
                <Ionicons name="volume-medium" size={responsive.iconSize} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            
            {/* School and Role */}
            <Text style={{ 
              ...theme.typography.body, 
              color: theme.colors.text,
              fontWeight: '600',
              fontSize: responsive.schoolFontSize,
              marginBottom: 2,
              flexShrink: 1,
            }}>
              {president.school}
            </Text>
            
            <Text style={{ 
              ...theme.typography.caption, 
              color: theme.colors.textSecondary,
              fontSize: responsive.roleFontSize,
              fontWeight: '500',
              marginBottom: theme.spacing.md,
              flexShrink: 1,
            }}>
              {president.role}
            </Text>

            {/* Stats Row - IMPROVED LAYOUT */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              gap: theme.spacing.sm, // Use gap instead of margins for better control
            }}>
              <View style={{
                backgroundColor: `rgba(59, 130, 246, 0.1)`,
                paddingHorizontal: responsive.badgePadding,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.md,
                flex: 1,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: `rgba(59, 130, 246, 0.2)`,
                minWidth: 0, // Important: allows content to shrink properly
              }}>
                <Text 
                  style={{
                    color: theme.colors.primary,
                    fontSize: responsive.badgeFontSize,
                    fontWeight: '800',
                    marginBottom: 2,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  TENURE
                </Text>
                <Text 
                  style={{
                    color: theme.colors.text,
                    fontSize: responsive.badgeFontSize + 2,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {president.tenure}
                </Text>
              </View>
              
              <View style={{
                backgroundColor: `rgba(16, 185, 129, 0.1)`,
                paddingHorizontal: responsive.badgePadding,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.md,
                flex: 1,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: `rgba(16, 185, 129, 0.2)`,
                minWidth: 0, // Important: allows content to shrink properly
              }}>
                <Text 
                  style={{
                    color: '#10B981',
                    fontSize: responsive.badgeFontSize,
                    fontWeight: '800',
                    marginBottom: 2,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ACHIEVEMENTS
                </Text>
                <Text 
                  style={{
                    color: theme.colors.text,
                    fontSize: responsive.badgeFontSize + 2,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {president.achievements}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={{ 
          marginTop: theme.spacing.lg,
          backgroundColor: `rgba(243, 244, 246, 0.6)`,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: theme.spacing.xs,
            flexWrap: 'wrap',
          }}>
            <Text style={{
              color: theme.colors.textSecondary,
              fontSize: responsive.badgeFontSize,
              fontWeight: '700',
              letterSpacing: 0.5,
              flexShrink: 1,
            }}>
              BIOGRAPHY
            </Text>
            <TouchableOpacity 
              onPress={toggleExpand} 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <Text style={{
                color: theme.colors.primary,
                fontSize: responsive.badgeFontSize - 1,
                fontWeight: '600',
                marginRight: 4,
              }}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </Text>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={responsive.chevronSize} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={{
            color: theme.colors.text,
            fontSize: responsive.bioFontSize,
            lineHeight: 20,
            fontWeight: '500',
            flexShrink: 1,
          }} numberOfLines={isExpanded ? undefined : 3}>
            {president.bio}
          </Text>
        </View>

        {/* Additional Info (if available) */}
        {(president.funFact || president.legacy) && (
          <View style={{ 
            marginTop: theme.spacing.md,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.xs,
          }}>
            {president.funFact && (
              <View style={{
                backgroundColor: `rgba(168, 85, 247, 0.1)`,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: 6,
                borderRadius: theme.borderRadius.sm,
                borderWidth: 1,
                borderColor: `rgba(168, 85, 247, 0.2)`,
                flexShrink: 1,
              }}>
                <Text style={{
                  color: '#A855F7',
                  fontSize: responsive.badgeFontSize,
                  fontWeight: '700',
                }}>
                  💫 {president.funFact}
                </Text>
              </View>
            )}
            
            {president.legacy && (
              <View style={{
                backgroundColor: `rgba(245, 158, 11, 0.1)`,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: 6,
                borderRadius: theme.borderRadius.sm,
                borderWidth: 1,
                borderColor: `rgba(245, 158, 11, 0.2)`,
                flexShrink: 1,
              }}>
                <Text style={{
                  color: '#F59E0B',
                  fontSize: responsive.badgeFontSize,
                  fontWeight: '700',
                }}>
                  🏆 {president.legacy}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Decorative Element */}
        <View style={{
          position: 'absolute',
          top: -1,
          right: -1,
          width: responsive.decorSize,
          height: responsive.decorSize,
          backgroundColor: `rgba(59, 130, 246, 0.05)`,
          borderBottomLeftRadius: theme.borderRadius.xl,
          borderTopRightRadius: theme.borderRadius.xl,
        }} />
      </Card>
    </View>
  );
};

export default PresidentCard;