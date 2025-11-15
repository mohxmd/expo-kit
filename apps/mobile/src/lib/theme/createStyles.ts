/** biome-ignore-all lint/suspicious/noExplicitAny:  React Native StyleSheet compatibility */
import { useMemo } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

import type { Theme } from "./theme";
import { useTheme } from "./theme-context";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/**
 * Performance-optimized style creation hook with full TypeScript support
 * Memoizes styles to prevent unnecessary recalculations
 *
 * @example
 * const useStyles = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: 16,
 *   },
 * }));
 *
 * function MyComponent() {
 *   const styles = useStyles();
 *   return <View style={styles.container} />;
 * }
 */
export function createStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  stylesFn: (theme: Theme) => T & NamedStyles<any>,
) {
  return function useStyles() {
    const { theme } = useTheme();
    // biome-ignore lint/correctness/useExhaustiveDependencies: Stable closure pattern
    return useMemo(() => StyleSheet.create(stylesFn(theme)), [theme]);
  };
}
