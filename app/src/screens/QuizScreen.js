import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header } from '../components/common';
import { useLanguage } from '../context/LanguageContext';
import { useTTS } from '../context/TTSContext';
import { theme } from '../styles/theme';

const QuizScreen = () => {
  const { t, language, getShuffledQuestions } = useLanguage();
  const { speak, isSpeaking, isPaused, togglePlayPause } = useTTS();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const optionAnimations = useRef([]).current;

  useEffect(() => {
    initializeQuiz();
  }, [language]);

  useEffect(() => {
    if (questions.length > 0) {
      optionAnimations.length = 0;
      const currentQuestionOptions = questions[currentQuestion]?.options || [];
      for (let i = 0; i < currentQuestionOptions.length; i++) {
        optionAnimations[i] = new Animated.Value(0);
      }
    }
  }, [questions, currentQuestion]);

  const initializeQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const shuffledQuestions = getShuffledQuestions();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQuestions(shuffledQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      
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
    } catch (err) {
      setError(t('common.failedToLoadQuiz') || 'Failed to load quiz');
      console.error('Quiz initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const animateOption = (index) => {
    if (optionAnimations[index]) {
      Animated.spring(optionAnimations[index], {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!questions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    animateOption(answerIndex);
    
    const currentQ = questions[currentQuestion];
    if (currentQ && answerIndex === currentQ.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  // Generate screen text for TTS
  const getCurrentQuestionText = () => {
    if (!questions[currentQuestion]) return '';
    const question = questions[currentQuestion];
    let text = `${t('quiz.question')} ${currentQuestion + 1} ${t('quiz.of')} ${questions.length}. `;
    text += `${question.question}. `;
    text += `Options: ${(question.options || []).join('. ')}`;
    
    if (showExplanation) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      const status = isCorrect ? t('quiz.correct') : t('quiz.incorrect');
      text += `. Answer: ${status}. ${question.explanation || ''}`;
    }
    
    return text;
  };

  const getScoreText = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let text = `${t('quiz.quizCompleted')}. `;
    text += `Your score: ${score} out of ${questions.length}. That's ${percentage}%. `;
    if (percentage >= 80) {
      text += t('quiz.outstanding');
    } else if (percentage >= 60) {
      text += t('quiz.greatJob');
    } else if (percentage >= 40) {
      text += t('quiz.goodEffort');
    } else {
      text += t('quiz.keepLearning');
    }
    return text;
  };

  const handleHeaderAudioPress = () => {
    const audioText = showScore ? getScoreText() : getCurrentQuestionText();
    if (isSpeaking) {
      togglePlayPause();
    } else {
      speak(audioText, language);
    }
  };

  const restartQuiz = () => {
    try {
      const shuffledQuestions = getShuffledQuestions();
      setQuestions(shuffledQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setError(null);
    } catch (err) {
      setError(t('common.failedToRestartQuiz') || 'Failed to restart quiz');
      console.error('Quiz restart error:', err);
    }
  };

  const renderOptions = () => {
    const question = questions[currentQuestion];
    if (!question || !question.options) return null;

    const optionElements = [];
    const questionOptions = question.options || [];

    for (let i = 0; i < questionOptions.length; i++) {
      const option = questionOptions[i];
      const animation = optionAnimations[i];
      
      const scale = animation ? animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1],
      }) : new Animated.Value(1);

      optionElements.push(
        <Animated.View
          key={i}
          style={[
            styles.optionContainer,
            { transform: [{ scale }] }
          ]}
        >
          <TouchableOpacity
            onPress={() => !showExplanation && handleAnswerSelect(i)}
            activeOpacity={0.8}
            style={styles.optionTouchable}
          >
            <LinearGradient
              colors={getOptionGradient(i, question)}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionIndicator,
                  getOptionIndicatorStyle(i, question)
                ]}>
                  <Text style={styles.optionIndicatorText}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[
                  styles.optionText,
                  getOptionTextStyle(i, question)
                ]}>
                  {option}
                </Text>
                
                {showExplanation && (
                  <View style={styles.statusIcon}>
                    {i === question.correctAnswer ? (
                      <Text style={styles.correctIcon}>✓</Text>
                    ) : selectedAnswer === i ? (
                      <Text style={styles.incorrectIcon}>✕</Text>
                    ) : null}
                  </View>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    return optionElements;
  };

  const getOptionGradient = (index, question) => {
    if (!question) return ['#FFFFFF', '#F8FAFC'];
    
    if (!showExplanation) {
      return selectedAnswer === index 
        ? ['#4F46E5', '#3730A3'] 
        : ['#FFFFFF', '#F8FAFC'];
    }
    
    if (index === question.correctAnswer) {
      return ['#10B981', '#059669'];
    } else if (selectedAnswer === index) {
      return ['#EF4444', '#DC2626'];
    }
    return ['#FFFFFF', '#F8FAFC'];
  };

  const getOptionIndicatorStyle = (index, question) => {
    if (!question) return {};
    
    if (!showExplanation) {
      return selectedAnswer === index 
        ? styles.optionIndicatorSelected 
        : {};
    }
    
    if (index === question.correctAnswer) {
      return styles.optionIndicatorCorrect;
    } else if (selectedAnswer === index) {
      return styles.optionIndicatorIncorrect;
    }
    return {};
  };

  const getOptionTextStyle = (index, question) => {
    if (!question) return {};
    
    if (!showExplanation) {
      return selectedAnswer === index 
        ? styles.optionTextSelected 
        : {};
    }
    
    if (index === question.correctAnswer || selectedAnswer === index) {
      return styles.optionTextSelected;
    }
    return {};
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title={t('quiz.title')} />
        <View style={styles.loadingContainer}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.loadingGradient}
          >
            <ActivityIndicator size="large" color={theme.colors.white} />
            <Text style={styles.loadingText}>
              {t('common.preparingQuiz') || 'Preparing your quiz...'}
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  }

  if (error || !questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Header title={t('quiz.title')} />
        <View style={styles.errorContainer}>
          <LinearGradient
            colors={['#FEF2F2', '#FEE2E2']}
            style={styles.errorGradient}
          >
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>
              {t('common.quizUnavailable') || 'Quiz Unavailable'}
            </Text>
            <Text style={styles.errorText}>
              {error || t('common.unableToLoadQuiz') || 'Unable to load quiz questions'}
            </Text>
            <Button
              title={t('common.tryAgain') || 'Try Again'}
              onPress={restartQuiz}
              variant="primary"
              style={styles.retryButton}
              icon="refresh-outline"
              gradient
            />
          </LinearGradient>
        </View>
      </View>
    );
  }

  if (showScore) {
    const percentage = Math.round((score / questions.length) * 100);
    const getScoreGradient = () => {
      if (percentage >= 80) return ['#10B981', '#059669'];
      if (percentage >= 60) return ['#3B82F6', '#2563EB'];
      if (percentage >= 40) return ['#F59E0B', '#D97706'];
      return ['#EF4444', '#DC2626'];
    };

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Header 
          title={t('quiz.title')} 
          onAudioPress={handleHeaderAudioPress}
          audioText={getScoreText()}
        />
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scoreContentContainer}
        >
          <View style={styles.scoreCard}>
            <LinearGradient
              colors={getScoreGradient()}
              style={styles.scoreGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.scoreTitle}>
                {t('quiz.quizCompleted')}
              </Text>
              
              <View style={styles.scoreCircle}>
                <Text style={styles.scorePercentage}>{percentage}%</Text>
                <Text style={styles.scoreSubtitle}>
                  {t('common.score')}
                </Text>
              </View>
              
              <Text style={styles.scoreText}>
                {score} / {questions.length} {t('quiz.correct')}
              </Text>

              <View style={styles.performanceMessage}>
                <Text style={styles.performanceText}>
                  {percentage >= 80 ? t('quiz.outstanding') : 
                   percentage >= 60 ? t('quiz.greatJob') : 
                   percentage >= 40 ? t('quiz.goodEffort') : 
                   t('quiz.keepLearning')}
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.scoreActions}>
              <Button
                title={t('quiz.restartQuiz')}
                onPress={restartQuiz}
                variant="primary"
                style={styles.actionButton}
                icon="refresh-outline"
                gradient
              />
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }

  const question = questions[currentQuestion];
  if (!question) {
    return (
      <View style={styles.container}>
        <Header title={t('quiz.title')} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {t('common.questionNotFound') || 'Question not found'}
          </Text>
          <Button
            title={t('quiz.restartQuiz')}
            onPress={restartQuiz}
            variant="primary"
            style={styles.retryButton}
          />
        </View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Header 
        title={t('quiz.title')} 
        onAudioPress={handleHeaderAudioPress}
        audioText={getCurrentQuestionText()}
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.quizContentContainer}
      >
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.progressCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>
                {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}
              </Text>
              <Text style={styles.progressPercentage}>
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </LinearGradient>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8FAFC']}
            style={styles.questionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.questionHeader}>
              <View style={styles.questionNumber}>
                <Text style={styles.questionNumberText}>Q{currentQuestion + 1}</Text>
              </View>
              <View style={styles.questionContent}>
                <Text style={styles.questionText}>{question.question}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {renderOptions()}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <LinearGradient
              colors={['#EFF6FF', '#DBEAFE']}
              style={styles.explanationGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.explanationTitle}>💡 {t('quiz.explanation')}</Text>
              <View style={styles.answerStatusContainer}>
                <View style={[
                  styles.answerStatus,
                  selectedAnswer === question.correctAnswer ? styles.answerStatusCorrect : styles.answerStatusIncorrect
                ]}>
                  <Text style={styles.answerStatusText}>
                    {selectedAnswer === question.correctAnswer ? t('quiz.correct') : t('quiz.incorrect')}
                  </Text>
                </View>
              </View>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </LinearGradient>
          </View>
        )}

        {/* Navigation Buttons */}
        {showExplanation && (
          <View style={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <Button
                title={t('common.previous')}
                onPress={handlePreviousQuestion}
                variant="outline"
                size="large"
                style={styles.backButton}
                icon="chevron-back-outline"
              />
            )}
            
            <Button
              title={
                currentQuestion + 1 === questions.length 
                  ? t('quiz.seeResults') 
                  : t('common.next')
              }
              onPress={handleNextQuestion}
              variant="primary"
              size="large"
              style={styles.nextButton}
              icon={currentQuestion + 1 === questions.length ? "trophy-outline" : "chevron-forward-outline"}
              gradient
            />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  quizContentContainer: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 100,
  },
  scoreContentContainer: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 120,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    ...theme.typography.h3,
    color: theme.colors.white,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    paddingTop: 120,
    padding: theme.spacing.lg,
  },
  errorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  errorTitle: {
    ...theme.typography.h2,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  retryButton: {
    marginTop: theme.spacing.md,
  },
  progressSection: {
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  progressCard: {
    padding: theme.spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressText: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.white,
  },
  progressPercentage: {
    ...theme.typography.h4,
    fontWeight: '700',
    color: theme.colors.white,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
  },
  questionCard: {
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  questionGradient: {
    padding: theme.spacing.xl,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questionNumber: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.lg,
    minWidth: 50,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  questionNumberText: {
    ...theme.typography.bodySmall,
    color: theme.colors.white,
    fontWeight: '700',
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    ...theme.typography.h3,
    lineHeight: 28,
    color: theme.colors.text,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  optionContainer: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  optionTouchable: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  optionIndicatorSelected: {
    backgroundColor: theme.colors.white,
  },
  optionIndicatorCorrect: {
    backgroundColor: '#10B981',
  },
  optionIndicatorIncorrect: {
    backgroundColor: '#EF4444',
  },
  optionIndicatorText: {
    ...theme.typography.body,
    fontWeight: '700',
    color: '#64748B',
  },
  optionText: {
    ...theme.typography.body,
    flex: 1,
    color: theme.colors.text,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  statusIcon: {
    marginLeft: theme.spacing.md,
  },
  correctIcon: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  incorrectIcon: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  explanationCard: {
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  explanationGradient: {
    padding: theme.spacing.xl,
  },
  explanationTitle: {
    ...theme.typography.h4,
    color: '#1E40AF',
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  answerStatusContainer: {
    marginBottom: theme.spacing.md,
  },
  answerStatus: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    alignSelf: 'flex-start',
  },
  answerStatusCorrect: {
    backgroundColor: '#10B98120',
  },
  answerStatusIncorrect: {
    backgroundColor: '#EF444420',
  },
  answerStatusText: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.text,
  },
  explanationText: {
    ...theme.typography.body,
    lineHeight: 24,
    color: theme.colors.text,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  scoreCard: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
    marginTop: theme.spacing.xl,
  },
  scoreGradient: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  scoreTitle: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    fontWeight: '800',
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.3)',
    ...theme.shadows.lg,
  },
  scorePercentage: {
    ...theme.typography.h1,
    fontSize: 42,
    color: theme.colors.white,
    fontWeight: '900',
  },
  scoreSubtitle: {
    ...theme.typography.body,
    color: 'rgba(255,255,255,0.9)',
    marginTop: theme.spacing.xs,
  },
  scoreText: {
    ...theme.typography.h3,
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    fontWeight: '600',
  },
  performanceMessage: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  performanceText: {
    ...theme.typography.body,
    fontWeight: '700',
    color: theme.colors.white,
    textAlign: 'center',
  },
  scoreActions: {
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  actionButton: {
    marginBottom: 0,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default QuizScreen;