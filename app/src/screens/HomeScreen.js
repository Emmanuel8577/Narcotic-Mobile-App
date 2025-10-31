import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/common/Button";
import Card from "../components/common/Cards";
import Header from "../components/common/Header";
import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import ResponsiveGrid from '../components/layout/ResponsiveGrid';
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { useResponsive } from '../hooks/useResponsive';
import { theme } from "../styles/theme";

const HomeScreen = ({ navigation }) => {
  const { isTablet, scale, responsiveSpacing, moderateScale, screenWidth } = useResponsive();
  const { t } = useLanguage();
  const { userProfile } = useAuth();
  const { speak } = useTTS();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Animated values for counting stats
  const [drugsCount, setDrugsCount] = useState(0);
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  // Final values for stats
  const statsTargets = {
    drugs: 30,
    schools: 10,
    students: 2000,
  };

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Start counting animations with delays
    setTimeout(
      () => animateCount(setDrugsCount, statsTargets.drugs, 2000),
      500
    );
    setTimeout(
      () => animateCount(setSchoolsCount, statsTargets.schools, 1500),
      800
    );
    setTimeout(
      () => animateCount(setStudentsCount, statsTargets.students, 2500),
      1100
    );
  }, []);

  const animateCount = (setter, target, duration) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth counting
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (target - startValue) * easeOutQuart
      );

      setter(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  };

  const getTranslation = (key, fallback) => {
    try {
      return t(key) || fallback;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return fallback;
    }
  };

  const quickStats = [
    {
      label: getTranslation("home.stats.drugsCovered", "Drugs Covered"),
      value: `${drugsCount}+`,
      icon: "💊",
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#7C3AED"],
    },
    {
      label: getTranslation(
        "home.stats.schoolsParticipating",
        "Schools Participating"
      ),
      value: schoolsCount.toString(),
      icon: "🏫",
      color: "#10B981",
      gradient: ["#10B981", "#059669"],
    },
    {
      label: getTranslation("home.stats.studentsReached", "Students Reached"),
      value: `${studentsCount.toLocaleString()}+`,
      icon: "👥",
      color: "#EC4899",
      gradient: ["#EC4899", "#DB2777"],
    },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const getUserFirstName = () => {
    if (!userProfile) return "User";

    if (userProfile?.first_name) {
      return userProfile.first_name;
    } else if (userProfile?.full_name) {
      const names = userProfile.full_name?.split(" ") || [];
      return names[0] || "User";
    }
    return "User";
  };

  const navigateToTab = (tabName) => {
    if (!navigation || !tabName) return;

    try {
      navigation.navigate("MainApp", { screen: tabName });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handlePlayWelcomeAudio = () => {
    const welcomeText = `Welcome ${getUserFirstName()} to Narcotic Action. Learn about drug prevention and stay safe. We have covered ${
      statsTargets.drugs
    } drugs, reached ${statsTargets.students.toLocaleString()} students across ${
      statsTargets.schools
    } schools.`;
    speak(welcomeText);
  };

  const renderStats = () => {
    if (!quickStats || !Array.isArray(quickStats)) {
      return null;
    }

    return quickStats.map((stat, index) => (
      <Animated.View
        key={index}
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -20 * index],
              }),
            },
          ],
        }}
      >
        <Card style={[
          styles.statCard,
          { width: isTablet ? screenWidth * 0.45 : screenWidth * 0.75 }
        ]}>
          <LinearGradient
            colors={stat.gradient}
            style={[
              styles.statGradient,
              { minHeight: isTablet ? 160 : 140 }
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statContent}>
              <View
                style={[
                  styles.statIcon,
                  { 
                    width: isTablet ? moderateScale(60) : moderateScale(50),
                    height: isTablet ? moderateScale(60) : moderateScale(50),
                    backgroundColor: "rgba(255,255,255,0.2)" 
                  }
                ]}
              >
                <Text style={[
                  styles.statIconText,
                  { fontSize: isTablet ? moderateScale(26) : moderateScale(22) }
                ]}>{stat.icon}</Text>
              </View>
              <Text style={[
                styles.statValue,
                { fontSize: isTablet ? moderateScale(28) : moderateScale(24) }
              ]}>{stat.value}</Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isTablet ? moderateScale(14) : moderateScale(12) }
              ]}>{stat.label}</Text>
            </View>
          </LinearGradient>
        </Card>
      </Animated.View>
    ));
  };

  const renderActionButton = (
    titleKey,
    fallback,
    tabName,
    variant = "primary",
    icon = ""
  ) => {
    const buttonTitle = getTranslation(titleKey, fallback);

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Button
          title={buttonTitle}
          onPress={() => navigateToTab(tabName)}
          variant={variant}
          size="large"
          style={styles.actionButton}
          icon={icon}
          gradient
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={getTranslation("home.title", "Home")}
        subtitle={getTranslation(
          "home.subtitle",
          "Welcome to Narcotic Action"
        )}
      />

      <ResponsiveContainer scrollable={true} style={styles.contentContainer}>
        {/* Welcome Hero Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Card style={styles.heroCard}>
            <LinearGradient
              colors={["#6366F1", "#8B5CF6", "#7C3AED"]}
              style={[
                styles.heroGradient,
                { minHeight: isTablet ? 200 : 180 }
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroContent}>
                <View style={styles.heroTextContent}>
                  <View style={styles.heroHeader}>
                    <View style={[
                      styles.heroIcon,
                      { 
                        width: isTablet ? moderateScale(60) : moderateScale(50),
                        height: isTablet ? moderateScale(60) : moderateScale(50)
                      }
                    ]}>
                      <Ionicons
                        name="shield-checkmark"
                        size={isTablet ? moderateScale(36) : moderateScale(32)}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text style={[
                      styles.heroTitle,
                      { fontSize: isTablet ? moderateScale(28) : moderateScale(24) }
                    ]}>
                      Welcome, {getUserFirstName()}!
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.audioButton,
                        { 
                          padding: isTablet ? moderateScale(10) : moderateScale(8)
                        }
                      ]}
                      onPress={handlePlayWelcomeAudio}
                    >
                      <Ionicons name="volume-high" size={isTablet ? moderateScale(24) : moderateScale(20)} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <Text style={[
                    styles.heroDescription,
                    { fontSize: isTablet ? moderateScale(16) : moderateScale(15) }
                  ]}>
                    {getTranslation(
                      "home.welcomeText",
                      "Empowering students with knowledge to combat substance abuse and build healthier communities"
                    )}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Card>
        </Animated.View>

        {/* Stats Grid */}
        <Text style={[
          styles.sectionTitle,
          { fontSize: isTablet ? moderateScale(24) : moderateScale(20) }
        ]}>
          {getTranslation("home.ourImpact", "Our Impact")}
        </Text>
        
        {isTablet ? (
          <ResponsiveGrid columns={2} spacing="lg">
            {renderStats()}
          </ResponsiveGrid>
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsScrollView}
            contentContainerStyle={styles.statsScrollContent}
          >
            {renderStats()}
          </ScrollView>
        )}

        {/* Quick Actions */}
        <Text style={[
          styles.sectionTitle,
          { fontSize: isTablet ? moderateScale(24) : moderateScale(20) }
        ]}>
          {getTranslation("home.quickActions", "Quick Actions")}
        </Text>
        
        {isTablet ? (
          <ResponsiveGrid columns={2} spacing="md">
            {renderActionButton(
              "home.learnAboutDrugs",
              "Learn About Drugs",
              "Education",
              "primary",
              "book-outline"
            )}
            {renderActionButton(
              "home.takeQuiz",
              "Take Quiz",
              "Quiz",
              "secondary",
              "help-circle-outline"
            )}
            {renderActionButton(
              "home.meetPresidents",
              "Meet Club Leaders",
              "Presidents",
              "primary",
              "people-outline"
            )}
          </ResponsiveGrid>
        ) : (
          <View style={styles.actionsGrid}>
            {renderActionButton(
              "home.learnAboutDrugs",
              "Learn About Drugs",
              "Education",
              "primary",
              "book-outline"
            )}
            {renderActionButton(
              "home.takeQuiz",
              "Take Quiz",
              "Quiz",
              "secondary",
              "help-circle-outline"
            )}
            {renderActionButton(
              "home.meetPresidents",
              "Meet Club Leaders",
              "Presidents",
              "primary",
              "people-outline"
            )}
          </View>
        )}

        {/* Emergency Section with bottom margin */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Card style={[styles.emergencyCard, styles.bottomSpacing]}>
            <LinearGradient
              colors={["#FEF2F2", "#FEE2E2"]}
              style={styles.emergencyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.emergencyContent}>
                <View style={styles.emergencyHeader}>
                  <View style={[
                    styles.emergencyIcon,
                    { 
                      width: isTablet ? moderateScale(55) : moderateScale(45),
                      height: isTablet ? moderateScale(55) : moderateScale(45)
                    }
                  ]}>
                    <Ionicons name="warning" size={isTablet ? moderateScale(28) : moderateScale(24)} color="#DC2626" />
                  </View>
                  <Text style={[
                    styles.emergencyTitle,
                    { fontSize: isTablet ? moderateScale(22) : moderateScale(20) }
                  ]}>
                    {getTranslation("home.needHelp", "Need Immediate Help?")}
                  </Text>
                </View>
                <Text style={[
                  styles.emergencyText,
                  { fontSize: isTablet ? moderateScale(16) : moderateScale(14) }
                ]}>
                  {getTranslation(
                    "home.helpText",
                    "If you or someone you know is struggling with substance abuse, reach out for professional help immediately. Your wellbeing matters."
                  )}
                </Text>
                <Button
                  title={getTranslation("home.getHelpNow", "Get Help Now")}
                  onPress={() => navigateToTab("Feedback")}
                  variant="error"
                  style={styles.emergencyButton}
                  icon="call-outline"
                  gradient
                />
              </View>
            </LinearGradient>
          </Card>
        </Animated.View>
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
  heroCard: {
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  heroGradient: {
    padding: theme.spacing.xl,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
  },
  heroTextContent: {
    flex: 1,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    flexWrap: "wrap",
  },
  heroIcon: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  heroTitle: {
    color: theme.colors.white,
    flex: 1,
    fontWeight: "800",
  },
  audioButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.borderRadius.round,
    marginLeft: theme.spacing.sm,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
  },
  sectionTitle: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
    fontWeight: "700",
  },
  statsScrollView: {
    marginBottom: theme.spacing.xxl,
  },
  statsScrollContent: {
    paddingRight: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  statGradient: {
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  statContent: {
    alignItems: "center",
    zIndex: 2,
  },
  statIcon: {
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  statIconText: {
    // Font size set dynamically
  },
  statValue: {
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
    fontWeight: "800",
  },
  statLabel: {
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  actionsGrid: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  actionButton: {
    marginBottom: 0,
  },
  emergencyCard: {
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  bottomSpacing: {
    marginBottom: theme.spacing.xxl,
  },
  emergencyGradient: {
    padding: theme.spacing.xl,
    position: "relative",
  },
  emergencyContent: {
    zIndex: 2,
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  emergencyIcon: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  emergencyTitle: {
    color: "#DC2626",
    fontWeight: "700",
  },
  emergencyText: {
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
    color: "#7F1D1D",
  },
  emergencyButton: {
    alignSelf: "flex-start",
  },
});

export default HomeScreen;