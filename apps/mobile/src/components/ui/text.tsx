import { Text as RNText, type TextProps } from "react-native";

import { createStyles } from "~/lib/theme/createStyles";
import { fontSize, fontWeight } from "~/lib/theme/theme";

const useTextStyles = createStyles((theme) => ({
  h1: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    color: theme.colors.text,
  },
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: theme.colors.text,
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: theme.colors.text,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    color: theme.colors.text,
  },
  caption: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    color: theme.colors.textMuted,
  },
}));

function H1({ style, ...props }: TextProps) {
  const styles = useTextStyles();
  return <RNText style={[styles.h1, style]} {...props} />;
}

function H2({ style, ...props }: TextProps) {
  const styles = useTextStyles();
  return <RNText style={[styles.h2, style]} {...props} />;
}

function H3({ style, ...props }: TextProps) {
  const styles = useTextStyles();
  return <RNText style={[styles.h3, style]} {...props} />;
}

function Text({ style, ...props }: TextProps) {
  const styles = useTextStyles();
  return <RNText style={[styles.body, style]} {...props} />;
}

function Caption({ style, ...props }: TextProps) {
  const styles = useTextStyles();
  return <RNText style={[styles.caption, style]} {...props} />;
}

export { H1, H2, H3, Text, Caption };
