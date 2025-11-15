import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

import { darkTheme, lightTheme } from "./theme";

export async function setAndroidNavigationBar(isDark: boolean) {
  if (Platform.OS !== "android") return;
  await NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  await NavigationBar.setBackgroundColorAsync(
    isDark ? darkTheme.background : lightTheme.background,
  );
}
