// src/navigation/AppNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { theme } from '../styles/theme';

// Import All Screens
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

// Responsive tab bar calculations
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;
const isSmallDevice = SCREEN_HEIGHT < 700;

// Calculate responsive tab bar dimensions
const getTabBarHeight = () => {
  if (Platform.OS === 'android') {
    if (isTablet) return 90;
    if (isSmallDevice) return 65;
    return 65;
  } else {
    if (isTablet) return 95;
    if (isSmallDevice) return 70;
    return 70;
  }
};

const getIconSize = (focused) => {
  if (isTablet) return focused ? 34 : 32;
  if (isSmallDevice) return focused ? 26 : 24;
  return focused ? 29 : 28;
};

const getLabelFontSize = () => {
  if (isTablet) return 14;
  if (isSmallDevice) return 10;
  return 12;
};

const TAB_BAR_HEIGHT = getTabBarHeight();

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

// Safe Tab Icon Component with responsive sizing
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
    console.warn('Tab icon error:', error);
  }

  return (
    <Ionicons 
      name={iconName} 
      size={getIconSize(focused)}
      color={color} 
    />
  );
};

// Main Tab Navigator with responsive design
const MainTabs = () => {
  const { t } = useLanguage();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;

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

  const tabScreenOptions = ({ route }) => {
    const currentTabBarHeight = getTabBarHeight();
    const currentLabelFontSize = getLabelFontSize();
    
    return {
      tabBarIcon: (props) => <SafeTabIcon route={route} {...props} />,
      tabBarActiveTintColor: getThemeValue('colors.primary', '#3B82F6'),
      tabBarInactiveTintColor: getThemeValue('colors.textTertiary', '#9CA3AF'),
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        height: currentTabBarHeight,
        paddingBottom: Platform.OS === 'android' ? 
          (isTablet ? 10 : (isSmallDevice ? 4 : 6)) : 
          (isTablet ? 16 : (isSmallDevice ? 8 : 12)),
        paddingTop: isSmallDevice ? 1 : 2,
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // Adjust for landscape mode
        ...(isLandscape && {
          height: Math.max(currentTabBarHeight - 10, 60),
          paddingBottom: Platform.OS === 'android' ? 2 : 6,
        }),
      },
      tabBarLabelStyle: {
        fontSize: currentLabelFontSize,
        fontWeight: '600',
        marginTop: isSmallDevice ? 1 : 2,
        marginBottom: 0,
        // Adjust for landscape
        ...(isLandscape && {
          fontSize: Math.max(currentLabelFontSize - 2, 10),
        }),
      },
      tabBarItemStyle: {
        paddingVertical: isSmallDevice ? 2 : 4,
        justifyContent: 'center',
        alignItems: 'center',
        // Adjust horizontal padding for tablets
        paddingHorizontal: isTablet ? 8 : 0,
      },
      headerShown: false,
      tabBarHideOnKeyboard: Platform.OS === 'android',
    };
  };

  return (
    <Tab.Navigator
      screenOptions={tabScreenOptions}
      sceneContainerStyle={{
        backgroundColor: getThemeValue('colors.background', '#F9FAFB'),
        paddingBottom: TAB_BAR_HEIGHT + (isTablet ? 20 : 10),
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
      console.error('NavigationContainer error:', error);
      return null;
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