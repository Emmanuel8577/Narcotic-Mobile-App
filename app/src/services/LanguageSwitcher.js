import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../services/LanguageSwitcher';

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useLanguage();

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

  // Safe language change function
  const safeChangeLanguage = (langCode) => {
    try {
      if (typeof changeLanguage === 'function') {
        changeLanguage(langCode);
      } else {
        console.warn('changeLanguage function not available');
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Safe languages array with fallbacks
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ha', name: 'Hausa' },
    { code: 'kn', name: 'Kanuri' }
  ];

  // Safe current language
  const currentLanguage = language || 'en';

  // Safe render function for language buttons
  const renderLanguageButtons = () => {
    if (!languages || !Array.isArray(languages)) {
      return (
        <Text style={styles.errorText}>
          {safeTranslate('common.languageDataError', 'Language data not available')}
        </Text>
      );
    }

    const languageElements = [];
    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      // Safety check for language object
      if (!lang || typeof lang !== 'object') {
        continue;
      }

      const langCode = lang.code || `lang-${i}`;
      const langName = lang.name || 'Unknown Language';
      const isActive = currentLanguage === lang.code;

      languageElements.push(
        <TouchableOpacity
          key={langCode}
          style={[
            styles.languageButton,
            isActive && styles.activeButton
          ]}
          onPress={() => safeChangeLanguage(lang.code)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.languageText,
              isActive && styles.activeText
            ]}
          >
            {langName}
          </Text>
        </TouchableOpacity>
      );
    }

    // If no valid languages found, show error
    if (languageElements.length === 0) {
      return (
        <Text style={styles.errorText}>
          {safeTranslate('common.noLanguagesAvailable', 'No languages available')}
        </Text>
      );
    }

    return languageElements;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {safeTranslate('settings.language', 'Language')}
      </Text>
      <View style={styles.languageList}>
        {renderLanguageButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1F2937',
    textAlign: 'center',
  },
  languageList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  languageText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    padding: 10,
    fontStyle: 'italic',
  },
});

export default LanguageSwitcher;