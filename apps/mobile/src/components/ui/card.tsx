import { View as RNView, type ViewProps } from "react-native";

import { createStyles } from "~/lib/theme/createStyles";
import { radius, shadow, spacing } from "~/lib/theme/theme";

const useCardStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: spacing.md,
    ...shadow.md,
  },
}));

export function Card({ style, ...props }: ViewProps) {
  const styles = useCardStyles();
  return <RNView style={[styles.card, style]} {...props} />;
}
