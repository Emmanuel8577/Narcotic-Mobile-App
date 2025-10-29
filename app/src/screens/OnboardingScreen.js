import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { t, changeLanguage, completeOnboarding } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Safe translation function
  const safeTranslate = (key, fallback) => {
    try {
      if (typeof t === 'function') {
        const translation = t(key);
        return translation || fallback;
      }
      return fallback;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback;
    }
  };

  // Safe theme access
  const getThemeValue = (path, fallback) => {
    try {
      const value = path.split('.').reduce((obj, key) => obj?.[key], theme);
      return value || fallback;
    } catch (error) {
      console.warn(`Theme access error for path "${path}":`, error);
      return fallback;
    }
  };

  // Safe navigation functions
  const safeNavigateToLogin = () => {
    try {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Login');
      } else {
        console.error('Navigation not available');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const safeNavigateToSignUp = () => {
    try {
      if (navigation && typeof navigation.replace === 'function') {
        completeOnboarding();
        navigation.replace('SignUp');
      } else {
        console.error('Navigation not available');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const safeChangeLanguage = (langCode) => {
    try {
      if (typeof changeLanguage === 'function') {
        changeLanguage(langCode);
      } else {
        console.warn('changeLanguage function not available');
      }
    } catch (error) {
      console.error('Language change error:', error);
    }
  };

  const safeCompleteOnboarding = () => {
    try {
      if (typeof completeOnboarding === 'function') {
        completeOnboarding();
      } else {
        console.warn('completeOnboarding function not available');
      }
    } catch (error) {
      console.error('Onboarding completion error:', error);
    }
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -width * 0.1,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (currentSlide < 1) {
        setCurrentSlide(currentSlide + 1);
        slideAnim.setValue(width * 0.1);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        safeCompleteOnboarding();
        safeNavigateToLogin();
      }
    });
  };

  const handleSkip = () => {
    safeCompleteOnboarding();
    safeNavigateToLogin();
  };

  const handleLanguageSelect = (langCode) => {
    safeChangeLanguage(langCode);
    handleNext();
  };

  // Render feature items without map
  const renderFeatureItems = () => {
    const featureItems = [
      { emoji: '🎯', text: 'Interactive Learning' },
      { emoji: '🛡️', text: 'Safety First Approach' },
      { emoji: '📚', text: 'Comprehensive Education' }
    ];

    const featureElements = [];
    for (let i = 0; i < featureItems.length; i++) {
      const feature = featureItems[i];
      if (!feature) continue;
      
      featureElements.push(
        <View key={i} style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>{feature.emoji || '📊'}</Text>
          </View>
          <Text style={styles.featureText}>{feature.text || 'Feature'}</Text>
        </View>
      );
    }
    return featureElements;
  };

  // Render language cards without map
  const renderLanguageCards = () => {
    const languages = [
      { code: 'en', flag: '🇺🇸', name: 'English', native: 'English', colors: ['#3B82F6', '#3B82F6DD'] },
      { code: 'ha', flag: '🇳🇬', name: 'Hausa', native: 'Hausa', colors: ['#10B981', '#10B981DD'] },
      { code: 'kn', flag: '🇳🇪', name: 'Kanuri', native: 'Kanuri', colors: ['#EC4899', '#EC4899DD'] }
    ];

    const languageElements = [];
    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      if (!lang) continue;
      
      languageElements.push(
        <TouchableOpacity
          key={lang.code || i}
          style={styles.languageCard}
          onPress={() => handleLanguageSelect(lang.code || 'en')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={lang.colors || ['#3B82F6', '#3B82F6DD']}
            style={styles.languageGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.languageFlag}>{lang.flag || '🏳️'}</Text>
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageName}>{lang.name || 'Language'}</Text>
              <Text style={styles.languageNative}>{lang.native || ''}</Text>
            </View>
            <View style={styles.selectionRing}>
              <View style={styles.selectionDot} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return languageElements;
  };

  const renderSlide = () => {
    if (currentSlide === 1) {
      // Language Selection Slide
      return (
        <Animated.View style={[
          styles.slideContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.centeredContent}>
              <View style={styles.illustrationContainer}>
                <Text style={styles.illustration}>🗣️</Text>
              </View>
              
              <Text style={styles.title}>
                {safeTranslate('onboarding.slide2.title', 'Choose Your Language')}
              </Text>
              <Text style={styles.subtitle}>
                {safeTranslate('onboarding.slide2.description', 'Select your preferred language for the app content')}
              </Text>
              
              <View style={styles.languageGrid}>
                {renderLanguageCards()}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      );
    }

    // First Slide - Drug Education Info
    return (
      <Animated.View style={[
        styles.slideContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centeredContent}>
            <View style={styles.illustrationContainer}>
              <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                style={styles.illustrationBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.illustration}>💊</Text>
              </LinearGradient>
            </View>
            
            <Text style={styles.title}>
              {safeTranslate('onboarding.slide1.title', 'Understanding Drug Abuse')}
            </Text>
            <Text style={styles.subtitle}>
              {safeTranslate('onboarding.slide1.description', 'Drug abuse affects millions worldwide. Learn about the dangers and how to protect yourself and your community from substance abuse.')}
            </Text>
            
            <View style={styles.featureList}>
              {renderFeatureItems()}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={getThemeValue('colors.background', '#FFFFFF')} />
      
      {/* Sign Up Button - Top Right (Only on second slide) */}
      {currentSlide === 1 && (
        <View style={styles.signUpContainer}>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={safeNavigateToSignUp}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.signUpGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[
          styles.progressDot,
          currentSlide === 0 && styles.progressDotActive
        ]} />
        <View style={[
          styles.progressDot,
          currentSlide === 1 && styles.progressDotActive
        ]} />
      </View>

      {/* Slide Content */}
      {renderSlide()}

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>
            {safeTranslate('onboarding.skip', 'Skip')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={getThemeValue('colors.gradientPrimary', ['#3B82F6', '#2563EB'])}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.nextText}>
              {currentSlide === 1 
                ? safeTranslate('onboarding.getStarted', 'Get Started')
                : safeTranslate('onboarding.next', 'Next')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background || '#FFFFFF',
  },
  signUpContainer: {
    position: 'absolute',
    top: height * 0.06,
    right: 20,
    zIndex: 1000,
  },
  signUpButton: {
    borderRadius: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  signUpGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 85,
  },
  signUpText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.06,
    paddingBottom: 16,
    gap: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    width: 24,
    backgroundColor: theme?.colors?.primary || '#3B82F6',
  },
  slideContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.6,
  },
  illustrationContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  illustrationBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  illustration: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    color: theme?.colors?.text || '#1F2937',
    lineHeight: 34,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: theme?.colors?.textSecondary || '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  featureList: {
    width: '100%',
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme?.colors?.surface || '#F9FAFB',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme?.colors?.text || '#1F2937',
    flex: 1,
  },
  languageGrid: {
    width: '100%',
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  languageCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    height: 80,
  },
  languageGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 16,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  selectionRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  selectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: Math.max(40, height * 0.05),
    backgroundColor: theme?.colors?.background || '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    minHeight: 80,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: theme?.colors?.textSecondary || '#6B7280',
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: 25,
    shadowColor: theme?.colors?.primary || '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    minWidth: 140,
  },
  nextGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;