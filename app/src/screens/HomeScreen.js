import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/common/Button";
import Card from "../components/common/Cards";
import Header from "../components/common/Header";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { theme } from "../styles/theme";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
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
        easing: Easing.out(Easing.cubic),
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
        <Card style={styles.statCard}>
          <LinearGradient
            colors={stat.gradient}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statContent}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <Text style={styles.statIconText}>{stat.icon}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>

            {/* Animated particles */}
            <View style={styles.particleContainer}>
              <View style={[styles.particle, styles.particle1]} />
              <View style={[styles.particle, styles.particle2]} />
              <View style={[styles.particle, styles.particle3]} />
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
      <Animated.View
        style={[styles.headerContainer, { opacity: headerOpacity }]}
      >
        <Header
          title={getTranslation("home.title", "Home")}
          subtitle={getTranslation(
            "home.subtitle",
            "Welcome to Narcotic Action"
          )}
          style={{ paddingTop: 65 }}
        />
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
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
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Background Pattern */}
              <View style={styles.heroPattern}>
                <View style={[styles.patternCircle, styles.patternCircle1]} />
                <View style={[styles.patternCircle, styles.patternCircle2]} />
                <View style={[styles.patternCircle, styles.patternCircle3]} />
              </View>
              <View style={styles.heroContent}>
                <View style={styles.heroTextContent}>
                  <View style={styles.heroHeader}>
                    <View style={styles.heroIcon}>
                      <Ionicons
                        name="shield-checkmark"
                        size={32}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text style={styles.heroTitle}>
                      Welcome, {getUserFirstName()}!
                    </Text>
                    <TouchableOpacity
                      style={styles.audioButton}
                      onPress={handlePlayWelcomeAudio}
                    >
                      <Ionicons name="volume-high" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.heroDescription}>
                    {getTranslation(
                      "home.welcomeText",
                      "Empowering students with knowledge to combat substance abuse and build healthier communities"
                    )}
                  </Text>
                </View>
              </View>

              {/* Wave Decoration */}
              <View style={styles.waveDecoration}>
                <View style={styles.wave} />
                <View style={[styles.wave, styles.wave2]} />
              </View>
            </LinearGradient>
          </Card>
        </Animated.View>

        {/* Stats Grid with Horizontal Scroll */}
        <Text style={styles.sectionTitle}>
          {getTranslation("home.ourImpact", "Our Impact")}
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statsScrollView}
          contentContainerStyle={styles.statsScrollContent}
        >
          {renderStats()}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          {getTranslation("home.quickActions", "Quick Actions")}
        </Text>
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

        {/* Emergency Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Card style={styles.emergencyCard}>
            <LinearGradient
              colors={["#FEF2F2", "#FEE2E2"]}
              style={styles.emergencyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.emergencyContent}>
                <View style={styles.emergencyHeader}>
                  <View style={styles.emergencyIcon}>
                    <Ionicons name="warning" size={24} color="#DC2626" />
                  </View>
                  <Text style={styles.emergencyTitle}>
                    {getTranslation("home.needHelp", "Need Immediate Help?")}
                  </Text>
                </View>
                <Text style={styles.emergencyText}>
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

              {/* Emergency Pattern */}
              <View style={styles.emergencyPattern}>
                <View
                  style={[styles.emergencyParticle, styles.emergencyParticle1]}
                />
                <View
                  style={[styles.emergencyParticle, styles.emergencyParticle2]}
                />
              </View>
            </LinearGradient>
          </Card>
        </Animated.View>

        {/* Bottom Spacer for Tab Bar */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    paddingTop: 160,
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
    minHeight: 180,
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  patternCircle1: {
    width: 100,
    height: 100,
    top: -30,
    right: -30,
  },
  patternCircle2: {
    width: 60,
    height: 60,
    bottom: -20,
    left: -20,
  },
  patternCircle3: {
    width: 40,
    height: 40,
    top: "30%",
    right: 50,
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
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  heroTitle: {
    ...theme.typography.h2,
    color: theme.colors.white,
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
  },
  audioButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.borderRadius.round,
    marginLeft: theme.spacing.sm,
  },
  heroDescription: {
    ...theme.typography.body,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
    fontSize: 15,
  },
  waveDecoration: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 15,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  wave2: {
    bottom: -4,
    backgroundColor: "rgba(255,255,255,0.05)",
    height: 12,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 20,
  },
  // Updated styles for horizontal scroll
  statsScrollView: {
    marginBottom: theme.spacing.xxl,
  },
  statsScrollContent: {
    paddingRight: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    width: width * 0.75, // 75% of screen width for better scroll experience
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    marginRight: theme.spacing.md,
  },
  statGradient: {
    padding: theme.spacing.lg,
    alignItems: "center",
    minHeight: 140,
    minWidth: width * 0.75,
  },
  statContent: {
    alignItems: "center",
    zIndex: 2,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  statIconText: {
    fontSize: 22,
  },
  statValue: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    ...theme.typography.caption,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    fontSize: 12,
  },
  particleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  particle1: {
    width: 20,
    height: 20,
    top: 10,
    right: 15,
  },
  particle2: {
    width: 12,
    height: 12,
    bottom: 20,
    left: 10,
  },
  particle3: {
    width: 8,
    height: 8,
    top: "40%",
    right: 25,
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
    marginBottom: 140,
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
    width: 45,
    height: 45,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  emergencyTitle: {
    ...theme.typography.h3,
    color: "#DC2626",
    fontWeight: "700",
  },
  emergencyText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
    color: "#7F1D1D",
  },
  emergencyButton: {
    alignSelf: "flex-start",
  },
  emergencyPattern: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  emergencyParticle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(220, 38, 38, 0.05)",
  },
  emergencyParticle1: {
    width: 30,
    height: 30,
    top: 10,
    right: 20,
  },
  emergencyParticle2: {
    width: 15,
    height: 15,
    bottom: 15,
    left: 15,
  },
  bottomSpacer: {
    height: 120,
  },
});

export default HomeScreen;