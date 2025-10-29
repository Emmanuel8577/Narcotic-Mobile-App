// src/navigation/AppNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Platform } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { theme } from '../styles/theme';

// Import Screens
import DrugDetailScreen from '../screens/DrugDetailScreen';
import EducationScreen from '../screens/EducationScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PresidentsScreen from '../screens/PresidentsScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Calculate tab bar height based on platform
const TAB_BAR_HEIGHT = Platform.OS === 'android' ? 90 : 95;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Safe theme access
const getThemeValue = (path, fallback) => {
  try {
    const value = path.split('.').reduce((obj, key) => obj?.[key], theme);
    return value || fallback;
  } catch (error) {
 
    return fallback;
  }
};

// Education Stack Navigator
const EducationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducationMain" component={EducationScreen} />
      <Stack.Screen name="DrugDetailScreen" component={DrugDetailScreen} />
    </Stack.Navigator>
  );
};

// Settings Stack Navigator
const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

// Safe Tab Icon Component
const SafeTabIcon = ({ route, focused, color, size }) => {
  let iconName = 'help-circle-outline';

  try {
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Education') {
      iconName = focused ? 'book' : 'book-outline';
    } else if (route.name === 'Presidents') {
      iconName = focused ? 'people' : 'people-outline';
    } else if (route.name === 'Quiz') {
      iconName = focused ? 'help-circle' : 'help-circle-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    }
  } catch (error) {
  }

  return (
    <Ionicons 
      name={iconName} 
      size={focused ? 29 : 28} // Slightly larger icons
      color={color} 
    />
  );
};

// Main Tab Navigator
const MainTabs = () => {
  const { t } = useLanguage();

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

  const tabScreenOptions = ({ route }) => ({
    tabBarIcon: (props) => <SafeTabIcon route={route} {...props} />,
    tabBarActiveTintColor: getThemeValue('colors.primary', '#3B82F6'),
    tabBarInactiveTintColor: getThemeValue('colors.textTertiary', '#9CA3AF'),
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E5E5E5',
      height: TAB_BAR_HEIGHT,
      paddingBottom: Platform.OS === 'android' ? 6 : 12, // Reduced bottom padding to move content up
      paddingTop: 2, // Increased top padding to push icons and text upward
      elevation: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 2, // Reduced margin to bring text closer to icons
      marginBottom: 0, // Remove bottom margin
    },
    tabBarItemStyle: {
      paddingVertical: 4, // Reduced vertical padding to compact items
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    headerShown: false,
    tabBarHideOnKeyboard: Platform.OS === 'android',
  });

  return (
    <Tab.Navigator
      screenOptions={tabScreenOptions}
      sceneContainerStyle={{
        backgroundColor: getThemeValue('colors.background', '#F9FAFB'),
        paddingBottom: TAB_BAR_HEIGHT + 10, // Add padding to prevent content from being hidden
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: safeTranslate('home.title', 'Home'),
        }}
      />
      <Tab.Screen 
        name="Education" 
        component={EducationStack}
        options={{ 
          title: safeTranslate('education.title', 'Drug Education'),
        }}
      />
      <Tab.Screen 
        name="Presidents" 
        component={PresidentsScreen}
        options={{ 
          title: safeTranslate('presidents.title', 'Club Leaders'),
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{ 
          title: safeTranslate('quiz.title', 'Drug Quiz'),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack}
        options={{ 
          title: safeTranslate('settings.title', 'Settings'),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator Component
const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  const SafeNavigationContainer = ({ children }) => {
    try {
      return (
        <NavigationContainer>
          {children}
        </NavigationContainer>
      );
    } catch (error) {
    }
  };

  const stackNavigatorOptions = {
    headerShown: false,
    animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
    contentStyle: {
      backgroundColor: getThemeValue('colors.background', '#F9FAFB'),
    },
  };

  return (
    <SafeNavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={stackNavigatorOptions}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{
            animation: 'slide_from_right',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={MainTabs}
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </SafeNavigationContainer>
  );
};

// Root Navigator with Auth Provider
const RootNavigator = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default RootNavigator;