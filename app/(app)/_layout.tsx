import { Href, Redirect, Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "../../src/auth/AuthContext";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#003366" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
