import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/orpc";
import { ThemeProvider } from "~/lib/theme";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined" ? useEffect : useLayoutEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useIsomorphicLayoutEffect(() => {
    setAndroidNavigationBar(isDark).catch(console.error);
  }, [isDark]);

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    // TODO: later <SplashScreen />
    return (
      <GestureHandlerRootView style={styles.loading}>
        <ActivityIndicator size="large" />
      </GestureHandlerRootView>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StatusBar style="auto" translucent animated />
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider>
            <KeyboardProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={!!session}>
                  <Stack.Screen name="(drawer)" />
                  <Stack.Screen name="modal" options={{ title: "Modal", presentation: "modal" }} />
                </Stack.Protected>
                <Stack.Protected guard={!session}>
                  <Stack.Screen name="(auth)" />
                </Stack.Protected>
              </Stack>
            </KeyboardProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
