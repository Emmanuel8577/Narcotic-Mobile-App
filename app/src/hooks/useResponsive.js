// src/hooks/useResponsive.js
import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Screen size breakpoints
  const isSmallDevice = dimensions.width < 375; // iPhone SE, small Android phones
  const isMediumDevice = dimensions.width >= 375 && dimensions.width < 414; // Most phones
  const isLargeDevice = dimensions.width >= 414 && dimensions.width < 768; // Large phones
  const isTablet = dimensions.width >= 768; // Tablets
  const isLargeTablet = dimensions.width >= 1024; // Large tablets

  // Orientation
  const isLandscape = dimensions.width > dimensions.height;

  // Responsive scaling functions
  const scale = (size) => {
    const scaleFactor = dimensions.width / 375; // Base width iPhone 6/7/8
    const scaledSize = size * scaleFactor;
    
    if (isTablet) return scaledSize * 0.9; // Slightly reduce scaling on tablets
    if (isSmallDevice) return scaledSize * 0.85; // Reduce scaling on small devices
    return Math.round(scaledSize);
  };

  const verticalScale = (size) => {
    const scaleFactor = dimensions.height / 667; // Base height iPhone 6/7/8
    const scaledSize = size * scaleFactor;
    
    if (isLandscape) return scaledSize * 0.8;
    return Math.round(scaledSize);
  };

  const moderateScale = (size, factor = 0.5) => {
    return size + (scale(size) - size) * factor;
  };

  // Responsive spacing
  const responsiveSpacing = {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
  };

  // Responsive font sizes
  const responsiveFontSizes = {
    h1: scale(32),
    h2: scale(28),
    h3: scale(22),
    body: scale(16),
    caption: scale(14),
    small: scale(12),
  };

  return {
    // Screen info
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    isLargeTablet,
    isLandscape,
    
    // Scaling functions
    scale,
    verticalScale,
    moderateScale,
    
    // Pre-defined values
    responsiveSpacing,
    responsiveFontSizes,
    
    // Platform
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
  };
};

export default useResponsive;