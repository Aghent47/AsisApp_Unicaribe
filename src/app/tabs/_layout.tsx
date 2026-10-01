import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "ASIS" }} />
      <Tabs.Screen name="about" options={{ title: "Acerca de" }} />
    </Tabs>
  );
}
