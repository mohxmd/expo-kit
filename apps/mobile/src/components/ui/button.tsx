import type React from "react";
import { Pressable, type PressableProps, Text as RNText, type ViewStyle } from "react-native";

import { createStyles } from "~/lib/theme/createStyles";
import { fontSize, fontWeight, radius, shadow, spacing } from "~/lib/theme/theme";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
};

const useButtonStyles = createStyles((theme) => ({
  base: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.sm,
  },
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textSm: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  textMd: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  textLg: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  textPrimary: {
    color: "#ffffff",
  },
  textSecondary: {
    color: "#ffffff",
  },
  textOutline: {
    color: theme.colors.text,
  },
}));

export function Button({
  variant = "primary",
  size = "md",
  style,
  children,
  ...props
}: ButtonProps) {
  const styles = useButtonStyles();

  const baseStyles: ViewStyle[] = [
    styles.base,
    size === "sm" && styles.sm,
    size === "md" && styles.md,
    size === "lg" && styles.lg,
    variant === "primary" && styles.primary,
    variant === "secondary" && styles.secondary,
    variant === "outline" && styles.outline,
  ].filter(Boolean) as ViewStyle[];

  const textStyle = [
    size === "sm" && styles.textSm,
    size === "md" && styles.textMd,
    size === "lg" && styles.textLg,
    variant === "primary" && styles.textPrimary,
    variant === "secondary" && styles.textSecondary,
    variant === "outline" && styles.textOutline,
  ];

  return (
    <Pressable
      style={(state) => [...baseStyles, typeof style === "function" ? style(state) : style]}
      {...props}
    >
      {typeof children === "string" ? <RNText style={textStyle}>{children}</RNText> : children}
    </Pressable>
  );
}
