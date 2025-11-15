import { StyleSheet, Text, View } from "react-native";

import { AppLayout } from "~/components/app-layout";
import { useTheme } from "~/lib/theme/theme-context";

export default function Modal() {
  const { theme } = useTheme();

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Modal</Text>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
