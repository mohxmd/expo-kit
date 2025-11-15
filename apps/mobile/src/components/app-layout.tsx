import type React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "~/lib/theme";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }]}>{children}</SafeAreaView>
  );
}
