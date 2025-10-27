import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { theme } from "../styles/theme";

const DrugDetailScreen = ({ route, navigation }) => {
  const { drug } = route.params;
  const { speak, isSpeaking, isPaused, togglePlayPause, language } = useTTS();
  const { t } = useLanguage();

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return theme.colors.error;
      case "medium":
        return "#FF9800";
      case "low":
        return "#4CAF50";
      default:
        return theme.colors.textSecondary;
    }
  };

  const getRiskDescription = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "Extremely dangerous with high addiction potential and severe health risks";
      case "medium":
        return "Moderate risk with potential for addiction and health complications";
      case "low":
        return "Lower risk but still carries potential for abuse and health issues";
      default:
        return "Risk level information not available";
    }
  };

  // Generate comprehensive text for audio reading
  const generateAudioText = () => {
    let text = `Drug Details for ${drug.name}. `;
    text += `Type: ${drug.type}. `;
    text += `Risk Level: ${drug.riskLevel}. `;
    text += `${getRiskDescription(drug.riskLevel)}. `;
    text += `Overview: ${drug.longDescription || drug.shortDescription}. `;

    if (drug.effects && drug.effects.length > 0) {
      text += `Common Effects: ${drug.effects.join(", ")}. `;
    }

    if (drug.risks && drug.risks.length > 0) {
      text += `Health Risks: ${drug.risks.join(", ")}. `;
    }

    text += `Important Warning: Drug abuse is dangerous and can lead to serious health complications, addiction, and even death. `;
    text += `Emergency Contacts: NAFDAC Helpline: +234(0)909-763-0506, NDLEA Line: 0800-1020-3040. `;

    return text;
  };

  const handleAudioPress = () => {
    if (isSpeaking) {
      togglePlayPause();
    } else {
      speak(generateAudioText(), language);
    }
  };

  // Render list items without map
  const renderListItems = (items, isRisk = false) => {
    if (!items || !Array.isArray(items)) return null;

    const itemElements = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      itemElements.push(
        <View key={i} style={styles.listItem}>
          <View
            style={[
              styles.bulletPoint,
              isRisk && { backgroundColor: theme.colors.error },
            ]}
          />
          <Text style={styles.listText}>{item}</Text>
        </View>
      );
    }
    return itemElements;
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Audio */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Drug Details</Text>

        <TouchableOpacity 
          onPress={handleAudioPress} 
          style={[styles.audioButton, isSpeaking && styles.audioButtonActive]}
        >
          <Ionicons
            name={isSpeaking && !isPaused ? "pause" : "volume-high-outline"}
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Drug Header */}
        <View style={styles.headerSection}>
          {drug.image && (
            <Image
              source={drug.image}
              style={styles.drugImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.headerText}>
            <Text style={styles.drugName}>{drug.name}</Text>
            <View style={styles.typeContainer}>
              <Text style={styles.drugType}>{drug.type}</Text>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskColor(drug.riskLevel) },
                ]}
              >
                <Text style={styles.riskText}>
                  {drug.riskLevel ? drug.riskLevel.toUpperCase() : "UNKNOWN"}{" "}
                  RISK
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Risk Level Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Level</Text>
          <Text style={styles.riskDescription}>
            {getRiskDescription(drug.riskLevel)}
          </Text>
        </View>

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>
            {drug.longDescription || drug.shortDescription}
          </Text>
        </View>

        {/* Effects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Effects</Text>
          {renderListItems(drug.effects)}
        </View>

        {/* Risks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Risks & Dangers</Text>
          {renderListItems(drug.risks, true)}
        </View>

        {/* Warning Section */}
        <View style={styles.warningSection}>
          <Text style={styles.warningTitle}>⚠️ Important Warning</Text>
          <Text style={styles.warningText}>
            Drug abuse is dangerous and can lead to serious health
            complications, addiction, and even death. If you or someone you know
            is struggling with substance abuse, please seek professional help
            immediately.
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <Text style={styles.emergencyText}>
            NAFDAC Helpline: +234(0)909-763-0506 {"\n"}
            or Complaints call 0800-1-NAFDAC (0800-1-623322){"\n"}
            NDLEA Line: 0800-1020-3040 {"\n"}
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryDark,
    ...theme.shadows.sm,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "600",
  },
  audioButton: {
    padding: theme.spacing.sm,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  audioButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 30,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  drugImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  drugName: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  drugType: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
  },
  riskBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  riskText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  riskDescription: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 20,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.sm,
  },
  listText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  warningSection: {
    backgroundColor: "#FFF3E0",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  warningTitle: {
    ...theme.typography.h3,
    color: "#E65100",
    marginBottom: theme.spacing.sm,
  },
  warningText: {
    ...theme.typography.body,
    color: "#E65100",
    lineHeight: 20,
  },
  emergencySection: {
    backgroundColor: "#FFEBEE",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  emergencyTitle: {
    ...theme.typography.h3,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  emergencyText: {
    ...theme.typography.body,
    color: theme.colors.error,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default DrugDetailScreen;