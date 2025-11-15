import { router } from "expo-router";
import { useState, useTransition } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { authClient } from "~/lib/auth-client";
import { createStyles, useTheme } from "~/lib/theme";

export default function SignIn() {
  const { theme } = useTheme();
  const styles = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async () => {
    Keyboard.dismiss();
    setError(null);
    startTransition(async () => {
      await authClient.signIn.email(
        { email, password },
        {
          onError: (error) => {
            setError(error.error?.message || "Failed to sign in");
          },
          onSuccess: () => {
            setEmail("");
            setPassword("");
            router.replace("/");
          },
        },
      );
    });
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Sign In</Text>
        <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>
          Welcome back! Please sign in to continue.
        </Text>

        {error && (
          <View
            style={[styles.errorCard, { backgroundColor: "#fee2e2", borderColor: theme.error }]}
          >
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={`${theme.text}80`}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isPending}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={`${theme.text}80`}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isPending}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.primary, opacity: isPending ? 0.6 : 1 },
            ]}
            onPress={handleSignIn}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>{isPending ? "Signing in..." : "Sign In"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push("/(auth)/sign-up")}
            disabled={isPending}
          >
            <Text style={[styles.linkText, { color: theme.primary }]}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  errorCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    color: theme.error,
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  },
}));
