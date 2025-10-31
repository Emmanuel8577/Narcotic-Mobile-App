import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { useResponsive } from '../hooks/useResponsive';
import { theme } from "../styles/theme";

const DrugDetailScreen = ({ route, navigation }) => {
  const { isTablet, scale, responsiveSpacing, moderateScale } = useResponsive();
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
          <Text style={[
            styles.listText,
            { fontSize: moderateScale(14) }
          ]}>{item}</Text>
        </View>
      );
    }
    return itemElements;
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Audio */}
      <View style={[
        styles.header,
        { 
          paddingHorizontal: responsiveSpacing.md,
          paddingTop: isTablet ? 70 : 60,
          paddingBottom: responsiveSpacing.lg
        }
      ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={moderateScale(24)} color={theme.colors.white} />
        </TouchableOpacity>

        <Text style={[
          styles.headerTitle,
          { fontSize: isTablet ? moderateScale(26) : moderateScale(24) }
        ]}>Drug Details</Text>

        <TouchableOpacity 
          onPress={handleAudioPress} 
          style={[
            styles.audioButton, 
            isSpeaking && styles.audioButtonActive,
            { width: moderateScale(40), height: moderateScale(40) }
          ]}
        >
          <Ionicons
            name={isSpeaking && !isPaused ? "pause" : "volume-high-outline"}
            size={moderateScale(24)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <ResponsiveContainer scrollable={true} style={styles.contentContainer}>
        {/* Drug Header */}
        <View style={[
          styles.headerSection,
          { 
            padding: responsiveSpacing.md,
            marginBottom: responsiveSpacing.lg
          }
        ]}>
          {drug.image && (
            <Image
              source={drug.image}
              style={[
                styles.drugImage,
                { 
                  width: isTablet ? moderateScale(100) : moderateScale(80),
                  height: isTablet ? moderateScale(100) : moderateScale(80),
                  marginRight: responsiveSpacing.md
                }
              ]}
              resizeMode="cover"
            />
          )}
          <View style={styles.headerText}>
            <Text style={[
              styles.drugName,
              { fontSize: isTablet ? moderateScale(28) : moderateScale(24) }
            ]}>{drug.name}</Text>
            <View style={styles.typeContainer}>
              <Text style={[
                styles.drugType,
                { fontSize: moderateScale(14) }
              ]}>{drug.type}</Text>
              <View
                style={[
                  styles.riskBadge,
                  { 
                    backgroundColor: getRiskColor(drug.riskLevel),
                    paddingHorizontal: responsiveSpacing.sm,
                    paddingVertical: responsiveSpacing.xs
                  }
                ]}
              >
                <Text style={[
                  styles.riskText,
                  { fontSize: moderateScale(10) }
                ]}>
                  {drug.riskLevel ? drug.riskLevel.toUpperCase() : "UNKNOWN"} RISK
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Risk Level Description */}
        <View style={[
          styles.section,
          { padding: responsiveSpacing.md, marginBottom: responsiveSpacing.md }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>Risk Level</Text>
          <Text style={[
            styles.riskDescription,
            { fontSize: moderateScale(14), lineHeight: moderateScale(20) }
          ]}>
            {getRiskDescription(drug.riskLevel)}
          </Text>
        </View>

        {/* Overview */}
        <View style={[
          styles.section,
          { padding: responsiveSpacing.md, marginBottom: responsiveSpacing.md }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>Overview</Text>
          <Text style={[
            styles.description,
            { fontSize: moderateScale(14), lineHeight: moderateScale(22) }
          ]}>
            {drug.longDescription || drug.shortDescription}
          </Text>
        </View>

        {/* Effects */}
        <View style={[
          styles.section,
          { padding: responsiveSpacing.md, marginBottom: responsiveSpacing.md }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>Common Effects</Text>
          {renderListItems(drug.effects)}
        </View>

        {/* Risks */}
        <View style={[
          styles.section,
          { padding: responsiveSpacing.md, marginBottom: responsiveSpacing.md }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>Health Risks & Dangers</Text>
          {renderListItems(drug.risks, true)}
        </View>

        {/* Warning Section */}
        <View style={[
          styles.warningSection,
          { 
            padding: responsiveSpacing.md, 
            marginBottom: responsiveSpacing.md,
            borderLeftWidth: moderateScale(4)
          }
        ]}>
          <Text style={[
            styles.warningTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>⚠️ Important Warning</Text>
          <Text style={[
            styles.warningText,
            { fontSize: moderateScale(14), lineHeight: moderateScale(20) }
          ]}>
            Drug abuse is dangerous and can lead to serious health
            complications, addiction, and even death. If you or someone you know
            is struggling with substance abuse, please seek professional help
            immediately.
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={[
          styles.emergencySection,
          { 
            padding: responsiveSpacing.md,
            borderLeftWidth: moderateScale(4),
            marginBottom: theme.spacing.xxl // Add bottom margin for tab bar space
          }
        ]}>
          <Text style={[
            styles.emergencyTitle,
            { fontSize: isTablet ? moderateScale(20) : moderateScale(18), marginBottom: responsiveSpacing.sm }
          ]}>Emergency Contacts</Text>
          <Text style={[
            styles.emergencyText,
            { fontSize: moderateScale(14), lineHeight: moderateScale(20) }
          ]}>
            NAFDAC Helpline: +234(0)909-763-0506 {"\n"}
            or Complaints call 0800-1-NAFDAC (0800-1-623322){"\n"}
            NDLEA Line: 0800-1020-3040 {"\n"}
          </Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryDark,
    ...theme.shadows.sm,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontWeight: "600",
    color: theme.colors.white,
  },
  audioButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  audioButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  drugImage: {
    borderRadius: theme.borderRadius.md,
  },
  headerText: {
    flex: 1,
  },
  drugName: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  drugType: {
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
  },
  riskBadge: {
    borderRadius: theme.borderRadius.sm,
  },
  riskText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  riskDescription: {
    color: theme.colors.text,
  },
  description: {
    color: theme.colors.text,
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
    color: theme.colors.text,
    flex: 1,
  },
  warningSection: {
    backgroundColor: "#FFF3E0",
    borderRadius: theme.borderRadius.md,
    borderLeftColor: "#FF9800",
  },
  warningTitle: {
    color: "#E65100",
    fontWeight: '600',
  },
  warningText: {
    color: "#E65100",
  },
  emergencySection: {
    backgroundColor: "#FFEBEE",
    borderRadius: theme.borderRadius.md,
    borderLeftColor: theme.colors.error,
  },
  emergencyTitle: {
    color: theme.colors.error,
    fontWeight: '600',
  },
  emergencyText: {
    color: theme.colors.error,
  },
});

export default DrugDetailScreen;