import { StatusBar, Text, View } from 'react-native';
import { theme } from '../../styles/theme';

const Header = ({ title, subtitle, rightComponent, style, showBackButton, onBackPress }) => {
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <View style={[{
        backgroundColor: theme.colors.primary,
        paddingTop: 20, // Extended padding for status bar
        paddingBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
      }, style]}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: theme.spacing.md, // Space below status bar
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...theme.typography.h1,
              color: theme.colors.white,
              fontSize: 28,
            }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{
                ...theme.typography.body,
                color: theme.colors.white,
                opacity: 0.9,
                marginTop: theme.spacing.xs,
              }}>
                {subtitle}
              </Text>
            )}
          </View>
          {rightComponent && (
            <View style={{ marginLeft: theme.spacing.md }}>
              {rightComponent}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;