import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { theme } from '../styles/theme';

const SplashScreen = ({ navigation }) => {
  const { isOnboardingCompleted, isLoading } = useLanguage();

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

  // Safe navigation
  const safeNavigate = (routeName) => {
    try {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace(routeName);
      } else {
        console.error('Navigation not available');
        // Fallback: try navigate if replace fails
        if (navigation && typeof navigation.navigate === 'function') {
          navigation.navigate(routeName);
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Safety check for isLoading
      if (isLoading === true) return;
      
      try {
        if (!isOnboardingCompleted) {
          safeNavigate('Onboarding');
        } else {
          safeNavigate('Login');
        }
      } catch (error) {
        console.error('Splash screen navigation error:', error);
        // Fallback navigation
        safeNavigate('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOnboardingCompleted, isLoading, navigation]);

  // Get safe theme values
  const primaryColor = getThemeValue('colors.primary', '#3B82F6');
  const whiteColor = getThemeValue('colors.white', '#FFFFFF');

  return (
    <View style={[styles.container, { backgroundColor: primaryColor }]}>
      <View style={styles.logoContainer}>
        <View style={[styles.logo, { backgroundColor: whiteColor }]}>
          <Text style={[styles.logoText, { color: primaryColor }]}>NA</Text>
        </View>
        <Text style={[styles.title, { color: whiteColor }]}>Narcotic Action</Text>
        <Text style={[styles.subtitle, { color: whiteColor }]}>Educate • Prevent • Protect</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: whiteColor }]}>Making Schools Drug-Free</Text>
      </View>
    </View>
  );
};

// Safe styles with fallbacks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default SplashScreen;