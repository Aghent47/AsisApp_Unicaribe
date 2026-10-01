import AuthProvider from "@/auth/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="app" />
        <Stack.Screen name="register" />
      </Stack>
    </AuthProvider>
  );
}
