import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './app/src/context/AuthContext';
import { LanguageProvider } from './app/src/context/LanguageContext';
import { TTSProvider } from './app/src/context/TTSContext';
import AppNavigator from './app/src/navigation/AppNavigator';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function NavigationBarManager() {
  useEffect(() => {
    const hideNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          const { NavigationBar } = await import('expo-navigation-bar');
          
          // Completely hide navigation bar
          await NavigationBar.setVisibilityAsync("hidden");
          
          // Prevent it from coming back with gestures
          await NavigationBar.setBehaviorAsync("inset-touch");
          
          // Set position to absolute
          await NavigationBar.setPositionAsync("absolute");
          
          // Make navigation bar transparent
          await NavigationBar.setBackgroundColorAsync("#00000000");
          
          
        } catch (error) {
        }
      }
    };

    hideNavigationBar();

    // Set up an interval to continuously ensure navigation bar stays hidden
    const interval = setInterval(() => {
      hideNavigationBar();
    }, 1000); // Check every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <TTSProvider>
            <NavigationBarManager />
            <AppNavigator />
          </TTSProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);