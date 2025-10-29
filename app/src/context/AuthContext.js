import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check if user has seen onboarding
  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(onboardingStatus === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  // Mark onboarding as completed
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();

    // Optimized session check with timeout
    const getSession = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 5000)
        );

        const sessionPromise = supabase.auth.getSession();
        
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);
        
        if (session?.user) {
          setUser(session.user);
          // Don't wait for profile fetch - let it happen in background
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for changes to auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          // Fetch profile in background without blocking
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  // Optimized login function with timeouts and caching
  const login = async (identifier, password) => {
    try {
      // Input validation
      if (!identifier?.trim() || !password) {
        throw new Error('Please enter both identifier and password');
      }

      const trimmedIdentifier = identifier.trim();
      let emailToUse = trimmedIdentifier;

      // Set timeout for entire login process
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout')), 10000)
      );

      // If username, find email quickly with timeout
      if (!trimmedIdentifier.includes('@')) {
        const profileTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Profile lookup timeout')), 5000)
        );

        const profilePromise = supabase
          .from('profiles')
          .select('email')
          .eq('username', trimmedIdentifier)
          .single();

        const { data: profile, error: profileError } = await Promise.race([profilePromise, profileTimeout]);

        if (profileError || !profile) {
          throw new Error('Invalid username or password');
        }

        emailToUse = profile.email;
      }

      // Direct login with timeout
      const loginPromise = supabase.auth.signInWithPassword({
        email: emailToUse,
        password: password,
      });

      const { data, error } = await Promise.race([loginPromise, timeoutPromise]);

      if (error) {
        throw error;
      }

      // Fetch profile in background without blocking login
      if (data.user) {
        setTimeout(() => fetchUserProfile(data.user.id), 100);
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Failed to login. Please try again.';
      if (error.message === 'Login timeout' || error.message === 'Profile lookup timeout') {
        errorMessage = 'Login is taking too long. Please check your connection.';
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email/username or password';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email before logging in';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Optimized register function
  const register = async (email, password, fullName, username, school) => {
    try {
      // Input validation
      if (!email || !password || !fullName || !username) {
        throw new Error('Please fill in all required fields');
      }

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Registration timeout')), 15000)
      );

      const registerPromise = supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: 'yourapp://auth-callback', // Add your app scheme
        },
      });

      const { data, error } = await Promise.race([registerPromise, timeoutPromise]);

      if (error) {
        throw error;
      }

      // Create user profile in background if user was created
      if (data.user) {
        // Don't wait for profile creation - it can happen async
        setTimeout(async () => {
          try {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: data.user.id,
                  email: data.user.email,
                  full_name: fullName.trim(),
                  username: username.trim(),
                  school: school?.trim(),
                  first_name: fullName.split(' ')[0],
                  created_at: new Date().toISOString(),
                },
              ]);

            if (profileError) {
              console.error('Profile creation error:', profileError);
            }
          } catch (profileError) {
            console.error('Async profile creation error:', profileError);
          }
        }, 0);
      }

      return { 
        success: true, 
        user: data.user,
        needsEmailVerification: !data.session // User needs to verify email
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.message === 'Registration timeout') {
        errorMessage = 'Registration is taking too long. Please check your connection.';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'An account with this email already exists';
      } else if (error.message.includes('Password')) {
        errorMessage = 'Password should be at least 6 characters';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    login,
    register,
    logout,
    loading,
    hasSeenOnboarding,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};