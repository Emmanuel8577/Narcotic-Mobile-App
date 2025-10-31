import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card } from "../components/common";
import { supabase } from "../config/supabase";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { theme } from "../styles/theme";

const FeedbackScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { user, userProfile } = useAuth();
  const [name, setName] = useState(userProfile?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safe translation function
  const safeTranslate = (key, fallback) => {
    try {
      if (typeof t === "function") {
        const translation = t(key);
        return translation || fallback;
      }
      return fallback;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback;
    }
  };

  // Safe theme access
  const getThemeValue = (path, fallback) => {
    try {
      const value = path.split(".").reduce((obj, key) => obj?.[key], theme);
      return value || fallback;
    } catch (error) {
      console.warn(`Theme access error for path "${path}":`, error);
      return fallback;
    }
  };

  const handleSubmit = async () => {
    if (!message || !message.trim()) {
      Alert.alert(
        safeTranslate("common.error", "Error"),
        safeTranslate("feedback.messageRequired", "Please enter your message")
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData = {
        name: name || userProfile?.full_name || "Anonymous",
        email: email || user?.email || "",
        message: message.trim(),
        category: category || "general",
        user_id: user?.id || null,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("feedback")
        .insert([feedbackData]);

      if (error) {
        throw error;
      }

      Alert.alert(
        safeTranslate("feedback.thankYou", "Thank You!"),
        safeTranslate(
          "feedback.submissionSuccess",
          "Your feedback has been submitted successfully."
        ),
        [
          {
            text: safeTranslate("common.ok", "OK"),
            onPress: () => {
              setMessage("");
              setCategory("general");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Feedback submission error:", error);
      Alert.alert(
        safeTranslate("common.error", "Error"),
        "Failed to submit feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe navigation
  const handleGoBack = () => {
    if (navigation && typeof navigation.goBack === "function") {
      navigation.goBack();
    }
  };

  // Render contact items without map
  const renderContactItems = () => {
    const contacts = [
      { name: "NAFDAC Helpline", number: "+234(0)909-763-0506" },
      { name: "Complaints Line", number: "0800-1-NAFDAC (0800-1-623322)" },
      { name: "NDLEA Line", number: "0800-1020-3040" },
    ];

    const contactElements = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      if (!contact) continue;

      contactElements.push(
        <View key={i} style={styles.contactItem}>
          <Text style={styles.contactName}>{contact.name || "Contact"}</Text>
          <Text style={styles.contactNumber}>{contact.number || ""}</Text>
        </View>
      );
    }
    return contactElements;
  };

  // Render category buttons without map
  const renderCategoryButtons = () => {
    const categories = [
      {
        id: "general",
        label: safeTranslate("feedback.categoryGeneral", "General Feedback"),
      },
      {
        id: "suggestion",
        label: safeTranslate("feedback.categorySuggestion", "Suggestion"),
      },
      {
        id: "issue",
        label: safeTranslate("feedback.categoryIssue", "Report Issue"),
      },
      {
        id: "help",
        label: safeTranslate("feedback.categoryHelp", "Need Help"),
      },
    ];

    const categoryElements = [];
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      if (!cat) continue;

      categoryElements.push(
        <TouchableOpacity
          key={cat.id || i}
          style={[
            styles.categoryButton,
            category === cat.id && styles.categoryButtonActive,
          ]}
          onPress={() => setCategory(cat.id || "general")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === cat.id && styles.categoryButtonTextActive,
            ]}
          >
            {cat.label || "Category"}
          </Text>
        </TouchableOpacity>
      );
    }
    return categoryElements;
  };

  // Safe Button component usage
  const renderSubmitButton = () => {
    const buttonTitle = isSubmitting
      ? safeTranslate("feedback.submitting", "Submitting...")
      : safeTranslate("feedback.submitFeedback", "Submit Feedback");

    return (
      <Button
        title={buttonTitle}
        onPress={handleSubmit}
        variant="primary"
        size="large"
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.submitButton}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={getThemeValue("colors.white", "#FFFFFF")}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {safeTranslate("feedback.title", "Feedback & Help")}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Emergency Contacts */}
        <Card style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>
            {safeTranslate("feedback.emergencyContacts", "Emergency Contacts")}
          </Text>
          <Text style={styles.emergencySubtitle}>
            {safeTranslate(
              "feedback.emergencySubtitle",
              "If you need immediate help, contact these resources:"
            )}
          </Text>

          {renderContactItems()}
        </Card>

        {/* Feedback Form */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>
            {safeTranslate("feedback.sendFeedback", "Send us your feedback")}
          </Text>

          <Text style={styles.label}>
            {safeTranslate("feedback.category", "Category")}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {renderCategoryButtons()}
          </ScrollView>

          <Text style={styles.label}>
            {safeTranslate("feedback.name", "Name (Optional)")}
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={safeTranslate(
              "feedback.namePlaceholder",
              "Enter your name"
            )}
            editable={!isSubmitting}
          />

          <Text style={styles.label}>
            {safeTranslate("feedback.email", "Email (Optional)")}
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder={safeTranslate(
              "feedback.emailPlaceholder",
              "Enter your email"
            )}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isSubmitting}
          />

          <Text style={styles.label}>
            {safeTranslate("feedback.message", "Message *")}
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder={safeTranslate(
              "feedback.messagePlaceholder",
              "Enter your message, feedback, or request for help..."
            )}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!isSubmitting}
          />

          {renderSubmitButton()}
        </Card>

        {/* Bottom Spacer for Tab Bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

// Safe styles with fallbacks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background || "#F9FAFB",
  },
  // Custom Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme?.colors?.primary || "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60, // For status bar
    borderBottomWidth: 1,
    borderBottomColor: theme?.colors?.primaryDark || "#1D4ED8",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.white,
    // Safe typography access
    ...(theme?.typography?.h2 || {}),
  },
  headerRight: {
    width: 40, // Same as back button for balance
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Extra padding for bottom tabs
  },
  emergencyCard: {
    backgroundColor: "#FFF3E0",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E65100",
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
    color: "#5D4037",
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE0B2",
  },
  contactName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5D4037",
  },
  contactNumber: {
    fontSize: 14,
    color: theme?.colors?.primary || "#3B82F6",
    fontWeight: "600",
  },
  formCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme?.colors?.white || "#FFFFFF",
    // Safe shadow access
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: theme?.colors?.text || "#1F2937",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
    color: theme?.colors?.text || "#1F2937",
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryContent: {
    paddingVertical: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: theme?.colors?.background || "#F3F4F6",
    borderWidth: 1,
    borderColor: theme?.colors?.border || "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: theme?.colors?.primary || "#3B82F6",
    borderColor: theme?.colors?.primary || "#3B82F6",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme?.colors?.text || "#1F2937",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 16,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default FeedbackScreen;
