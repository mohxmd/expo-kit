import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Container } from "~/components/container";
import { authClient } from "~/lib/auth-client";
import { NAV_THEME } from "~/lib/constants";
import { orpc, queryClient } from "~/lib/orpc";
import { useColorScheme } from "~/lib/use-color-scheme";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const privateData = useQuery(orpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Expo Kit</Text>

          {session?.user ? (
            <View
              style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.userHeader}>
                <Text style={[styles.userText, { color: theme.text }]}>
                  Welcome, <Text style={styles.userName}>{session.user.name}</Text>
                </Text>
              </View>
              <Text style={[styles.userEmail, { color: theme.text, opacity: 0.7 }]}>
                {session.user.email}
              </Text>
              <TouchableOpacity
                style={[styles.signOutButton, { backgroundColor: theme.notification }]}
                onPress={() => {
                  authClient.signOut();
                  queryClient.invalidateQueries();
                }}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.authButtonsContainer}>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity style={[styles.authButton, { backgroundColor: theme.primary }]}>
                  <Text style={styles.authButtonText}>Sign In</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity
                  style={[
                    styles.authButton,
                    { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 },
                  ]}
                >
                  <Text style={[styles.authButtonText, { color: theme.text }]}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}

          <View
            style={[styles.statusCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>System Status</Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: isConnected ? "#10b981" : "#ef4444" },
                ]}
              />
              <View style={styles.statusContent}>
                <Text style={[styles.statusTitle, { color: theme.text }]}>ORPC Backend</Text>
                <Text style={[styles.statusText, { color: theme.text, opacity: 0.7 }]}>
                  {isLoading
                    ? "Checking connection..."
                    : isConnected
                      ? "Connected to API"
                      : "API Disconnected"}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.privateDataCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>Private Data</Text>
            {privateData && (
              <Text style={[styles.privateDataText, { color: theme.text, opacity: 0.7 }]}>
                {privateData.data?.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  userHeader: {
    marginBottom: 8,
  },
  userText: {
    fontSize: 16,
  },
  userName: {
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  signOutButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  authButtonsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  authButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  authButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  statusCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusIndicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
  },
  privateDataCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  privateDataText: {
    fontSize: 14,
  },
});
