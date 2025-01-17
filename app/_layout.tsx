import "reflect-metadata";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { Routes } from '@/src/ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from '@/src/ui/themes/lightTheme';
import { UserProvider } from '@/src/application/context/userContext';
import { AppDataSource } from "@/src/infra/database/dataSource";
import { Alert } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);

  const [loaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    initializeDatabase();
  }, [])

  useEffect(() => {
    if (loaded && isDatabaseInitialized) {
      SplashScreen.hide();
    }
  }, [loaded, isDatabaseInitialized]);

  async function initializeDatabase() {
    try {
      await AppDataSource.initialize();
      setIsDatabaseInitialized(true);
    } catch (error: any) {
      Alert.alert("Could not initialize database", error.message);
    }
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </ThemeProvider>
  );
}
