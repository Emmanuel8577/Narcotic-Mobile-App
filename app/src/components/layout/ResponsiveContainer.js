// src/components/layout/ResponsiveContainer.js
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';

const ResponsiveContainer = ({ 
  children, 
  style, 
  scrollable = false, 
  avoidKeyboard = false,
  contentContainerStyle,
  ...props 
}) => {
  const { isTablet, responsiveSpacing, isLandscape } = useResponsive();

  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: isTablet ? responsiveSpacing.xl : responsiveSpacing.lg,
    },
    style,
  ];

  const ContainerComponent = scrollable ? ScrollView : View;
  
  const containerProps = scrollable ? {
    contentContainerStyle: [
      {
        flexGrow: 1,
        paddingBottom: isTablet ? responsiveSpacing.xxl : responsiveSpacing.xl,
      },
      contentContainerStyle,
    ],
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
  } : {};

  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <ContainerComponent
          style={containerStyle}
          {...containerProps}
          {...props}
        >
          {children}
        </ContainerComponent>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ContainerComponent
      style={containerStyle}
      {...containerProps}
      {...props}
    >
      {children}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default ResponsiveContainer;