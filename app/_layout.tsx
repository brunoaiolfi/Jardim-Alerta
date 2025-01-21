import "reflect-metadata";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { Routes } from '@/src/ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from '@/src/ui/themes/lightTheme';
import { UserProvider } from '@/src/application/context/userContext';
import { Alert, Text, TouchableOpacity } from "react-native";
import { database } from "@/src/infra/database";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);
  const [a, setA] = useState<any[]>([])

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
      setIsDatabaseInitialized(true);
    } catch (error: any) {
      Alert.alert("Could not initialize database", error.message);
    }
  }

  async function add() {
    await database.get("environments").create((environment: any) => {
      environment.title = "Teste";
    })
  }
  async function refresh() {
    const environmentsCollections = database.get("environments");

    const all = await environmentsCollections.query().fetch();
    setA(all);
  }
  return (
    <ThemeProvider theme={lightTheme}>
      <UserProvider>
        {/* <Routes /> */}
        {a.map((item) => {
          return <Text key={item.id}>{item.title}</Text>
        })}
        <TouchableOpacity onPress={add}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={refresh}>
          <Text>refresh</Text>
        </TouchableOpacity>
      </UserProvider>
    </ThemeProvider>
  );
}
