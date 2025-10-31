// App.js
import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import { LogBox, Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './app/src/context/AuthContext';
import { LanguageProvider } from './app/src/context/LanguageContext';
import { TTSProvider } from './app/src/context/TTSContext';
import AppNavigator from './app/src/navigation/AppNavigator';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native',
]);

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
          const { NavigationBar } = require('expo-navigation-bar');
          
          if (NavigationBar) {
            await Promise.all([
              NavigationBar.setVisibilityAsync("hidden"),
              NavigationBar.setBehaviorAsync("inset-touch"),
              NavigationBar.setPositionAsync("absolute"),
              NavigationBar.setBackgroundColorAsync("#00000000")
            ]);
          }
        } catch (error) {
          console.log('Navigation bar customization not available');
        }
      }
    };

    hideNavigationBar();
    const interval = setInterval(hideNavigationBar, 2000);

    return () => clearInterval(interval);
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