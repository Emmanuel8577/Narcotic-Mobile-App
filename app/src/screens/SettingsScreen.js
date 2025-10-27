import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/common/Button";
import Card from "../components/common/Cards";
import Header from "../components/common/Header";
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { theme } from "../styles/theme";

const SettingsScreen = ({ navigation }) => {
  const { t, language, changeLanguage } = useLanguage();
  const { voiceType, changeVoice, isAudioEnabled } = useTTS();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [studyReminders, setStudyReminders] = React.useState(true);
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [showVoiceModal, setShowVoiceModal] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "ha", name: "Hausa", nativeName: "Hausa", flag: "🇳🇬" },
    { code: "kn", name: "Kanuri", nativeName: "Kanuri", flag: "🇳🇪" },
  ];

  const voices = [
    {
      id: "female",
      name: t("settings.femaleVoice"),
      icon: "female",
      color: "#EC407A",
    },
    {
      id: "male",
      name: t("settings.maleVoice"),
      icon: "male",
      color: "#42A5F5",
    },
  ];

  const settingsSections = [
    {
      title: t("settings.preferences"),
      icon: "settings-outline",
      items: [
        {
          label: t("settings.language"),
          description: t("settings.languageDesc"),
          value: language,
          onValueChange: () => setShowLanguageModal(true),
          type: "button",
          icon: "language-outline",
        },
        {
          label: t("settings.voice"),
          description: t("settings.voiceDesc"),
          value: voiceType,
          onValueChange: () => setShowVoiceModal(true),
          type: "button",
          icon: "mic-outline",
        },
        {
          label: t("settings.pushNotifications"),
          description: t("settings.pushNotificationsDesc"),
          value: notifications,
          onValueChange: setNotifications,
          type: "switch",
          icon: "notifications-outline",
        },
        {
          label: t("settings.darkMode"),
          description: t("settings.darkModeDesc"),
          value: darkMode,
          onValueChange: setDarkMode,
          type: "switch",
          icon: "moon-outline",
        },
        {
          label: t("settings.studyReminders"),
          description: t("settings.studyRemindersDesc"),
          value: studyReminders,
          onValueChange: setStudyReminders,
          type: "switch",
          icon: "alarm-outline",
        },
      ],
    },
    {
      title: t("settings.support"),
      icon: "help-circle-outline",
      items: [
        {
          label: t("feedback.sendFeedback"),
          description: t("settings.feedbackDesc"),
          type: "button",
          onPress: () => {
            if (navigation && typeof navigation.navigate === 'function') {
              navigation.navigate("Feedback");
            }
          },
          icon: "chatbubble-outline",
        },
        {
          label: t("settings.about"),
          description: t("settings.aboutDesc"),
          type: "button",
          onPress: () => console.log("About pressed"),
          icon: "information-circle-outline",
        },
        {
          label: t("settings.privacyPolicy"),
          description: t("settings.privacyPolicyDesc"),
          type: "button",
          onPress: () => console.log("Privacy pressed"),
          icon: "shield-checkmark-outline",
        },
        {
          label: t("settings.termsOfService"),
          description: t("settings.termsOfServiceDesc"),
          type: "button",
          onPress: () => console.log("Terms pressed"),
          icon: "document-text-outline",
        },
      ],
    },
  ];

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setShowLanguageModal(false);
  };

  const handleVoiceSelect = (voiceId) => {
    changeVoice(voiceId);
    setShowVoiceModal(false);
  };

  const handleLogout = () => {
    try {
      if (navigation && typeof navigation.reset === 'function') {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (error) {
      console.error('Logout navigation error:', error);
    }
  };

  const getCurrentLanguage = () => {
    if (!languages || !Array.isArray(languages)) return "English";

    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      if (lang && lang.code === language) {
        return lang.nativeName || lang.name || "English";
      }
    }
    return "English";
  };

  const getCurrentVoice = () => {
    if (!voices || !Array.isArray(voices)) {
      return t("settings.femaleVoice");
    }

    for (let i = 0; i < voices.length; i++) {
      const voice = voices[i];
      if (voice && voice.id === voiceType) {
        return voice.name || t("settings.femaleVoice");
      }
    }
    return t("settings.femaleVoice");
  };

  // Generate screen text for TTS
  const getScreenText = () => {
    let text = `${t('settings.title')}. `;
    text += `Current language: ${getCurrentLanguage()}. `;
    text += `Current voice: ${getCurrentVoice()}. `;
    text += `Notifications: ${notifications ? 'On' : 'Off'}. `;
    text += `Dark mode: ${darkMode ? 'On' : 'Off'}. `;
    text += `Study reminders: ${studyReminders ? 'On' : 'Off'}.`;
    return text;
  };

  const renderLanguageOptions = () => {
    if (!languages || !Array.isArray(languages)) return null;

    const languageElements = [];
    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      if (!lang) continue;

      languageElements.push(
        <TouchableOpacity
          key={lang.code || i}
          style={[
            styles.optionItem,
            language === lang.code && styles.optionItemSelected,
          ]}
          onPress={() => handleLanguageSelect(lang.code || 'en')}
        >
          <Text style={styles.optionFlag}>{lang.flag || "🏳️"}</Text>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionName}>{lang.name || "Language"}</Text>
            <Text style={styles.optionNative}>{lang.nativeName || ""}</Text>
          </View>
          {language === lang.code && (
            <View style={styles.selectedBadge}>
              <Ionicons name="checkmark" size={16} color={theme.colors.white} />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    return languageElements;
  };

  const renderVoiceOptions = () => {
    if (!voices || !Array.isArray(voices)) return null;

    const voiceElements = [];
    for (let i = 0; i < voices.length; i++) {
      const voice = voices[i];
      if (!voice) continue;

      voiceElements.push(
        <TouchableOpacity
          key={voice.id || i}
          style={[
            styles.optionItem,
            voiceType === voice.id && styles.optionItemSelected,
          ]}
          onPress={() => handleVoiceSelect(voice.id || 'female')}
        >
          <View style={[styles.voiceIcon, { backgroundColor: voice.color || '#EC407A' }]}>
            <Ionicons 
              name={voice.icon || 'female'} 
              size={20} 
              color={theme.colors.white} 
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionName}>{voice.name || "Voice"}</Text>
            <Text style={styles.optionNative}>
              {voiceType === voice.id ? t("settings.currentVoice") : ""}
            </Text>
          </View>
          {voiceType === voice.id && (
            <View style={styles.selectedBadge}>
              <Ionicons name="checkmark" size={16} color={theme.colors.white} />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    return voiceElements;
  };

  const renderSettingsSections = () => {
    if (!settingsSections || !Array.isArray(settingsSections)) return null;

    const sectionElements = [];
    for (let i = 0; i < settingsSections.length; i++) {
      const section = settingsSections[i];
      if (!section) continue;

      sectionElements.push(
        <Card key={i} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name={section.icon || "settings-outline"}
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.sectionTitle}>{section.title || "Section"}</Text>
          </View>
          {renderSettingsItems(section.items)}
        </Card>
      );
    }
    return sectionElements;
  };

  const renderSettingsItems = (items) => {
    if (!items || !Array.isArray(items)) return null;

    const itemElements = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;

      itemElements.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.settingItem,
            i < items.length - 1 && styles.settingItemBorder,
          ]}
          onPress={
            item.type === "button"
              ? item.onValueChange || item.onPress
              : undefined
          }
          activeOpacity={item.type === "button" ? 0.7 : 1}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons
                name={item.icon || "help-circle-outline"}
                size={20}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{item.label || "Setting"}</Text>
              <Text style={styles.settingDescription}>{item.description || ""}</Text>
              {item.type === "button" &&
                item.label === t("settings.language") && (
                  <Text style={styles.currentValue}>
                    {getCurrentLanguage()}
                  </Text>
                )}
              {item.type === "button" && 
                item.label === t("settings.voice") && (
                <Text style={styles.currentValue}>{getCurrentVoice()}</Text>
              )}
            </View>
          </View>

          {item.type === "switch" && (
            <Switch
              value={item.value || false}
              onValueChange={item.onValueChange}
              trackColor={{ 
                false: "#E0E0E0", 
                true: theme.colors.primaryLight
              }}
              thumbColor={item.value ? theme.colors.primary : "#f4f3f4"}
            />
          )}
          {item.type === "button" && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          )}
        </TouchableOpacity>
      );
    }
    return itemElements;
  };

  const ModalOverlay = ({ visible, onClose, children, title }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title || "Select Option"}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Header 
        title={t("settings.title")} 
        audioText={getScreenText()}
        style={{ paddingTop: 65 }} 
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSettingsSections()}

        {/* Language Selection Modal */}
        <ModalOverlay
          visible={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          title={t("settings.selectLanguage")}
        >
          <View style={styles.modalOptions}>{renderLanguageOptions()}</View>
        </ModalOverlay>

        {/* Voice Selection Modal */}
        <ModalOverlay
          visible={showVoiceModal}
          onClose={() => setShowVoiceModal(false)}
          title={t("settings.selectVoice")}
        >
          <View style={styles.modalOptions}>{renderVoiceOptions()}</View>
        </ModalOverlay>

        {/* App Info */}
        <Card style={styles.infoCard}>
          <View style={styles.appIcon}>
            <Ionicons name="medical" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.infoTitle}>
            {t("app.name")}
          </Text>
          <Text style={styles.infoVersion}>Version 2.0.0</Text>
          <Text style={styles.infoDescription}>
            {t("settings.appDescription")}
          </Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title={t("settings.clearData")}
            onPress={() => console.log("Clear data")}
            variant="outline"
            style={styles.actionButton}
            icon="trash-outline"
          />
          <Button
            title={t("settings.logout")}
            onPress={handleLogout}
            variant="secondary"
            style={styles.actionButton}
            icon="log-out-outline"
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 80,
  },
  sectionCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
    color: theme.colors.primary,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    ...theme.typography.body,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
    color: theme.colors.text,
  },
  settingDescription: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  currentValue: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.primary,
    marginTop: 2,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: "100%",
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: "center",
    color: theme.colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalOptions: {
    // Options container
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "#F8F9FA",
  },
  optionItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: "#E8F5E8",
  },
  optionFlag: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  voiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionName: {
    ...theme.typography.body,
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  optionNative: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  infoTitle: {
    ...theme.typography.h2,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
    textAlign: "center",
  },
  infoVersion: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  infoDescription: {
    ...theme.typography.body,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    color: theme.colors.text,
  },
  actionButtons: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    marginBottom: 0,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default SettingsScreen;