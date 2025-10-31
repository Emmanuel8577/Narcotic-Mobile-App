import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/common/Header';
import PresidentCard from '../components/custom/PresidentCard';
import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import ResponsiveGrid from '../components/layout/ResponsiveGrid';
import { useLanguage } from '../context/LanguageContext';
import { useTTS } from '../context/TTSContext';
import { presidentsData } from '../data/presidentsData';
import { useResponsive } from '../hooks/useResponsive';
import { theme } from '../styles/theme';

const PresidentsScreen = () => {
  const { isTablet, scale, responsiveSpacing, moderateScale } = useResponsive();
  const { t, language } = useLanguage();
  const { speak } = useTTS();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Safe translation function with proper key structure
  const safeTranslate = (key, fallback) => {
    try {
      if (typeof t === 'function') {
        const translation = t(key);
        // If translation returns the key (not found), use fallback
        return translation && translation !== key ? translation : fallback;
      }
      return fallback;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback;
    }
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Define subtitle text directly since it's not in locales
  const heroSubtitle = "Meet our dedicated student leaders from various schools who are actively working to create drug-free environments and educate their peers about substance abuse prevention.";

  const handlePlayScreenAudio = () => {
    try {
      const screenText = `${safeTranslate('presidents.title', 'Club Leaders')}. ${heroSubtitle}. Meet our ${(presidentsData || []).length} dedicated presidents leading the fight against drug abuse.`;
      speak?.(screenText);
    } catch (error) {
      console.error('Error playing screen audio:', error);
    }
  };

  // Safe presidents data
  const safePresidentsData = presidentsData || [];

  // Beautiful hero section - Only shows subtitle
  const renderHeroSection = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View style={[
        styles.heroSection,
        { 
          marginHorizontal: responsiveSpacing.lg,
          marginBottom: responsiveSpacing.xl,
          marginTop: responsiveSpacing.xl
        }
      ]}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#7C3AED']}
          style={[
            styles.heroGradient,
            { minHeight: isTablet ? 220 : 200 }
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            {/* Main Content - Full width for text */}
            <View style={styles.heroMainContent}>
              <View style={styles.heroTextContent}>
                {/* Only subtitle in hero section */}
                <View style={styles.titleContainer}>
                  <View style={styles.titleRow}>
                    <View style={styles.heroIconContainer}>
                      <Ionicons name="people" size={isTablet ? scale(36) : scale(32)} color="#FFFFFF" />
                      <View style={styles.iconBadge}>
                        <Text style={[
                          styles.iconBadgeText,
                          { fontSize: scale(10) }
                        ]}>{safePresidentsData.length}</Text>
                      </View>
                    </View>
                    {/* Title removed from hero section - only in Header */}
                  </View>
                  
                  {/* Only subtitle displayed in hero section */}
                  <Text style={[
                    styles.heroSubtitle,
                    { fontSize: isTablet ? scale(17) : scale(16) }
                  ]}>
                    {heroSubtitle}
                  </Text>
                </View>

                {/* Stats Section */}
                <View style={[
                  styles.heroStats,
                  { padding: responsiveSpacing.md }
                ]}>
                  <View style={styles.statItem}>
                    <Text style={[
                      styles.statNumber,
                      { fontSize: isTablet ? scale(20) : scale(18) }
                    ]}>{safePresidentsData.length}</Text>
                    <Text style={[
                      styles.statLabel,
                      { fontSize: scale(11) }
                    ]}>Leaders</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={[
                      styles.statNumber,
                      { fontSize: isTablet ? scale(20) : scale(18) }
                    ]}>
                      {safePresidentsData.reduce((sum, president) => sum + (president.achievements || 0), 0)}
                    </Text>
                    <Text style={[
                      styles.statLabel,
                      { fontSize: scale(11) }
                    ]}>Achievements</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={[
                      styles.statNumber,
                      { fontSize: isTablet ? scale(20) : scale(18) }
                    ]}>10+</Text>
                    <Text style={[
                      styles.statLabel,
                      { fontSize: scale(11) }
                    ]}>Schools</Text>
                  </View>
                </View>
              </View>

              {/* Audio Button - Icon only */}
              <TouchableOpacity 
                style={[
                  styles.audioButton,
                  { 
                    width: isTablet ? scale(60) : scale(50),
                    height: isTablet ? scale(60) : scale(50)
                  }
                ]}
                onPress={handlePlayScreenAudio}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                  style={styles.audioButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="volume-high" size={isTablet ? scale(28) : scale(24)} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );

  const renderPresidentItem = ({ item, index }) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -30 * index],
              }),
            },
          ],
        }}
      >
        <PresidentCard president={item} />
      </Animated.View>
    );
  };

  // Combine hero section with presidents data safely
  const data = [{ id: 'hero', type: 'hero' }, ...safePresidentsData];

  const renderItem = ({ item, index }) => {
    if (!item) return null;

    if (item.type === 'hero') {
      return renderHeroSection();
    }
    
    if (!item.id && !item.name) {
      console.warn('Invalid president item:', item);
      return null;
    }
    
    return renderPresidentItem({ item, index: index - 1 });
  };

  const keyExtractor = (item, index) => {
    if (!item) return `item-${index}`;
    if (item.id) return String(item.id);
    if (item.name) return String(item.name);
    return `item-${index}`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header shows the title from locales */}
      <Header 
        title={safeTranslate('presidents.title', 'Club Leaders')} 
        subtitle="" // Empty subtitle since it's in the hero section
      />
      
      {isTablet ? (
        <ResponsiveContainer scrollable={true}>
          {renderHeroSection()}
          <ResponsiveGrid columns={2} spacing="lg">
            {safePresidentsData.map((president, index) => (
              <PresidentCard key={president.id || index} president={president} />
            ))}
          </ResponsiveGrid>
        </ResponsiveContainer>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[
                styles.emptyText,
                { fontSize: scale(16) }
              ]}>
                {safeTranslate('presidents.noPresidents', 'No presidents data available')}
              </Text>
            </View>
          }
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background || '#F9FAFB',
  },
  heroSection: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  heroGradient: {
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  heroContent: {
    width: '100%',
  },
  heroMainContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroTextContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  titleContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
  },
  heroIconContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
    flexShrink: 0,
  },
  iconBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#10B981',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  iconBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    fontWeight: '500',
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'left',
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: theme.borderRadius.lg,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 60,
  },
  statNumber: {
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: theme.spacing.sm,
  },
  audioButton: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  audioButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: theme.colors.textSecondary || '#6B7280',
    textAlign: 'center',
  },
});

export default PresidentsScreen;