import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

import { useTheme } from "~/lib/theme";

export function HeaderButton({ onPress }: { onPress?: () => void }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.background : theme.card,
        },
      ]}
    >
      {({ pressed }) => (
        <FontAwesome
          name="info-circle"
          size={20}
          color={theme.text}
          style={{
            opacity: pressed ? 0.7 : 1,
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
});
