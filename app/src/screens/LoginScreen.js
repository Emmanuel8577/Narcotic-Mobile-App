import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../config/supabase"; // Import supabase
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { theme } from "../styles/theme";

const LoginScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Toggle password visibility - CORRECTED LOGIC
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert("Error", "Please enter both identifier and password");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting login with:", { identifier });

      const result = await login(identifier, password);

      if (result.success) {
        console.log("Login successful, navigating to MainApp");
        navigation.replace("MainApp");
      } else {
        Alert.alert("Login Error", result.error || "Failed to login. Please try again.");
      }
    } catch (error) {
      console.log("Login error caught:", error);
      Alert.alert("Login Error", "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = async () => {
    if (!identifier) {
      Alert.alert("Error", "Please enter your email or username first");
      return;
    }

    // For password reset, we need email
    let email = identifier;
    
    // If identifier is not email, try to find the email
    if (!identifier.includes('@')) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', identifier)
          .single();

        if (error || !profile) {
          Alert.alert(
            "Password Reset",
            "Please contact support with your username to reset your password, or use your email address.",
            [{ text: "OK" }]
          );
          return;
        }
        email = profile.email;
      } catch (error) {
        Alert.alert("Error", "Unable to find email for this username.");
        return;
      }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      Alert.alert(
        "Password Reset",
        "Check your email for a password reset link",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("login.title") || "Welcome Back"}</Text>
          <Text style={styles.subtitle}>
            {t("login.subtitle") || "Sign in with email or username"}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email or Username
            </Text>
            <TextInput
              style={styles.input}
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="Enter your email or username"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("login.password") || "Password"}
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword} // CORRECTED: Show password when showPassword is true
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <Ionicons 
                  name={showPassword ? "eye" : "eye-off"} // CORRECTED: eye when visible, eye-off when hidden
                  size={24} 
                  color={theme.colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>
              {t("login.forgotPassword") || "Forgot Password?"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!identifier || !password || isLoading) &&
                styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!identifier || !password || isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Logging in..." : t("login.login") || "Login"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t("login.or") || "OR"}</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              {t("login.noAccount") || "Don't have an account?"}{" "}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signupLink}>
                {t("login.signUp") || "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: theme.borderRadius.md,
    padding: 15,
    fontSize: 16,
  },
  // New styles for password input with eye icon
  passwordInputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: theme.borderRadius.md,
    padding: 15,
    fontSize: 16,
    paddingRight: 50, // Add padding to prevent text from being hidden behind the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    padding: 5, // Add padding for better touch area
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 15,
    color: theme.colors.textSecondary,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: theme.colors.textSecondary,
  },
  signupLink: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});

export default LoginScreen;