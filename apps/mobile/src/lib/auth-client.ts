import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

if (!process.env.EXPO_PUBLIC_SERVER_URL) throw new Error("Missing EXPO_PUBLIC_SERVER_URL in .env");

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: Constants.expoConfig?.scheme as string,
      storage: SecureStore,
      // cookiePrefix: ""
    }),
  ],
});
