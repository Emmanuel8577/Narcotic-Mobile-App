import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/common/Header";
import DrugCard from "../components/custom/DrugCard";
import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import ResponsiveGrid from '../components/layout/ResponsiveGrid';
import { useLanguage } from "../context/LanguageContext";
import { useTTS } from "../context/TTSContext";
import { useResponsive } from '../hooks/useResponsive';
import { theme } from "../styles/theme";

const EducationScreen = ({ navigation }) => {
  const { isTablet, scale, responsiveSpacing, moderateScale } = useResponsive();
  const { t, language, drugData } = useLanguage();
  const { speak } = useTTS();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    { id: "all", label: t("education.allDrugs"), icon: "💊", color: "#3B82F6" },
    {
      id: "high",
      label: t("education.highRisk"),
      icon: "⚠️",
      color: "#EF4444",
    },
    {
      id: "medium",
      label: t("education.mediumRisk"),
      icon: "🔶",
      color: "#F59E0B",
    },
    { id: "low", label: t("education.lowRisk"), icon: "✅", color: "#10B981" },
  ];

  const filteredDrugs =
    selectedCategory === "all"
      ? drugData || []
      : (drugData || []).filter(
          (drug) => drug && drug.riskLevel === selectedCategory
        );

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleDrugCardPress = (drug) => {
    if (drug) {
      navigation.navigate("DrugDetailScreen", { drug });
    }
  };

  // Generate screen text for header TTS
  const getScreenText = () => {
    let text = `${t("education.title")}. ${t("education.subtitle")}. `;
    text += `Categories: ${categories.map((cat) => cat.label).join(", ")}. `;
    text += `Showing ${filteredDrugs.length} ${
      filteredDrugs.length === 1
        ? t("common.substance")
        : t("common.substances")
    }.`;

    // Add first few drug names
    if (filteredDrugs.length > 0) {
      const drugNames = filteredDrugs
        .slice(0, 5)
        .map((d) => d?.name || "Unknown")
        .join(", ");
      text += ` Drugs include: ${drugNames}`;
      if (filteredDrugs.length > 5) {
        text += `, and ${filteredDrugs.length - 5} more`;
      }
    }

    return text;
  };

  const renderDrugItem = ({ item, index }) => {
    if (!item) {
      return null;
    }

    return (
      <Animated.View
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
        <DrugCard drug={item} onPress={() => handleDrugCardPress(item)} />
      </Animated.View>
    );
  };

  const getCategoryStyle = (category) => {
    const isActive = selectedCategory === category.id;
    return [
      styles.categoryPill,
      isActive && [styles.categoryPillActive, { borderColor: category.color }],
    ];
  };

  const getCategoryTextStyle = (category) => {
    const isActive = selectedCategory === category.id;
    return [
      styles.categoryText,
      isActive && [styles.categoryTextActive, { color: category.color }],
    ];
  };

  const renderCategories = () => {
    const categoryElements = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      categoryElements.push(
        <TouchableOpacity
          key={category.id}
          style={getCategoryStyle(category)}
          onPress={() => handleCategorySelect(category.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Text style={getCategoryTextStyle(category)}>{category.label}</Text>
        </TouchableOpacity>
      );
    }
    return categoryElements;
  };

  return (
    <View style={styles.container}>
      <Header
        title={t("education.title")}
        subtitle={t("education.subtitle")}
        audioText={getScreenText()}
      />

      <ResponsiveContainer scrollable={true} style={styles.contentContainer}>
        {/* Categories Section */}
        <View style={[
          styles.categoriesCard,
          { 
            padding: responsiveSpacing.lg,
            marginBottom: responsiveSpacing.xl
          }
        ]}>
          <View style={styles.categoriesHeader}>
            <Text style={[
              styles.categoriesTitle,
              { fontSize: isTablet ? moderateScale(20) : moderateScale(18) }
            ]}>{t("common.categories")}</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {renderCategories()}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={[
            styles.resultsText,
            { fontSize: moderateScale(14) }
          ]}>
            {filteredDrugs.length}{" "}
            {filteredDrugs.length === 1
              ? t("common.substance")
              : t("common.substances")}{" "}
            {t("common.found")}
          </Text>
          <View style={styles.resultsDivider} />
        </View>

        {/* Drugs List with bottom spacing */}
        {isTablet ? (
          <View style={styles.bottomSpacing}>
            <ResponsiveGrid columns={2} spacing="lg">
              {filteredDrugs.map((item, index) => (
                <Animated.View
                  key={item?.id || index}
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
                  <DrugCard drug={item} onPress={() => handleDrugCardPress(item)} />
                </Animated.View>
              ))}
            </ResponsiveGrid>
          </View>
        ) : (
          <FlatList
            data={filteredDrugs}
            renderItem={renderDrugItem}
            keyExtractor={(item, index) => {
              if (item?.id) return String(item.id);
              if (item?.name) return item.name;
              return `drug-${index}`;
            }}
            scrollEnabled={false}
            contentContainerStyle={[styles.listContainer, styles.bottomSpacing]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[
                  styles.emptyText,
                  { fontSize: moderateScale(16) }
                ]}>
                  No drugs found in this category
                </Text>
              </View>
            }
          />
        )}
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
  bottomSpacing: {
    marginBottom: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  categoriesCard: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.white,
    ...theme.shadows.md,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  categoriesTitle: {
    color: theme.colors.text,
    flex: 1,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.xs,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
    marginHorizontal: theme.spacing.xs,
    borderWidth: 2,
    borderColor: "transparent",
    ...theme.shadows.sm,
    minWidth: 120,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    ...theme.shadows.md,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  categoryText: {
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
  categoryTextActive: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  resultsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  resultsText: {
    color: theme.colors.textSecondary,
    fontWeight: "600",
    marginRight: theme.spacing.md,
  },
  resultsDivider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.textSecondary,
  },
});

export default EducationScreen;