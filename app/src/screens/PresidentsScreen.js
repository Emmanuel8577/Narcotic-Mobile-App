import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/common/Header';
import PresidentCard from '../components/custom/PresidentCard';
import { useLanguage } from '../context/LanguageContext';
import { useTTS } from '../context/TTSContext';
import { presidentsData } from '../data/presidentsData';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const PresidentsScreen = () => {
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
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#7C3AED']}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Background Pattern */}
          <View style={styles.heroPattern}>
            <View style={[styles.patternCircle, styles.patternCircle1]} />
            <View style={[styles.patternCircle, styles.patternCircle2]} />
            <View style={[styles.patternCircle, styles.patternCircle3]} />
          </View>

          <View style={styles.heroContent}>
            {/* Main Content - Full width for text */}
            <View style={styles.heroMainContent}>
              <View style={styles.heroTextContent}>
                {/* Only subtitle in hero section */}
                <View style={styles.titleContainer}>
                  <View style={styles.titleRow}>
                    <View style={styles.heroIconContainer}>
                      <Ionicons name="people" size={32} color="#FFFFFF" />
                      <View style={styles.iconBadge}>
                        <Text style={styles.iconBadgeText}>{safePresidentsData.length}</Text>
                      </View>
                    </View>
                    {/* Title removed from hero section - only in Header */}
                  </View>
                  
                  {/* Only subtitle displayed in hero section */}
                  <Text style={styles.heroSubtitle}>
                    {heroSubtitle}
                  </Text>
                </View>

                {/* Stats Section */}
                <View style={styles.heroStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{safePresidentsData.length}</Text>
                    <Text style={styles.statLabel}>Leaders</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {safePresidentsData.reduce((sum, president) => sum + (president.achievements || 0), 0)}
                    </Text>
                    <Text style={styles.statLabel}>Achievements</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>10+</Text>
                    <Text style={styles.statLabel}>Schools</Text>
                  </View>
                </View>
              </View>

              {/* Audio Button - Icon only */}
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={handlePlayScreenAudio}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                  style={styles.audioButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="volume-high" size={24} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Wave Decoration */}
          <View style={styles.waveDecoration}>
            <View style={styles.wave} />
            <View style={[styles.wave, styles.wave2]} />
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
        <PresidentCard 
          president={item}
        />
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
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {safeTranslate('presidents.noPresidents', 'No presidents data available')}
            </Text>
          </View>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background || '#F9FAFB',
  },
  heroSection: {
    marginHorizontal: theme.spacing.lg || 16,
    marginBottom: theme.spacing.xl || 24,
    marginTop: theme.spacing.xl || 24,
    borderRadius: theme.borderRadius.xl || 20,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  heroGradient: {
    padding: theme.spacing.xl || 24,
    minHeight: 200, // Increased to accommodate the longer subtitle
    justifyContent: 'center',
  },
  heroPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  patternCircle1: {
    width: 120,
    height: 120,
    top: -40,
    right: -40,
  },
  patternCircle2: {
    width: 80,
    height: 80,
    bottom: -20,
    left: -20,
  },
  patternCircle3: {
    width: 60,
    height: 60,
    top: '50%',
    right: 40,
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
    marginRight: theme.spacing.md || 12,
  },
  titleContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg || 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md || 12,
    flexWrap: 'wrap',
  },
  heroIconContainer: {
    position: 'relative',
    marginRight: theme.spacing.md || 12,
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
    fontSize: 10,
    fontWeight: '800',
  },
  heroSubtitle: {
    fontSize: 16,
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
    borderRadius: theme.borderRadius.lg || 12,
    padding: theme.spacing.md || 12,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.lg || 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 60,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
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
    marginHorizontal: theme.spacing.sm || 8,
  },
  audioButton: {
    borderRadius: theme.borderRadius.lg || 12,
    overflow: 'hidden',
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  audioButtonGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg || 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  waveDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wave2: {
    bottom: -5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    height: 15,
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
    fontSize: 16,
    color: theme.colors.textSecondary || '#6B7280',
    textAlign: 'center',
  },
});

export default PresidentsScreen;