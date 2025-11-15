import { ScrollView, Text, View } from "react-native";

import { AppLayout } from "~/components/app-layout";
import { createStyles, useTheme } from "~/lib/theme";

export default function TabTwo() {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <AppLayout>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Tab Two</Text>
          <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>
            Discover more features and content
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const useStyles = createStyles((theme) => ({
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  content: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
}));
