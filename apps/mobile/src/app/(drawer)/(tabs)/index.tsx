import { ScrollView, Text, View } from "react-native";

import { createStyles, useTheme } from "~/lib/theme";

export default function TabOne() {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Tab One</Text>
        <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>
          Explore the first section of your app
        </Text>
      </View>
    </ScrollView>
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
