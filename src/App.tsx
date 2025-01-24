import "reflect-metadata";
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Routes } from './ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './ui/themes/lightTheme';
import { UserProvider } from './application/context/userContext';
import { Alert } from "react-native";
import { AppDataSource } from "./infra/database";
import { LoadingView } from "./ui/views/loading";

export default function App() {

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    initializeDatabase();
  }, [])

  async function initializeDatabase() {
    try {
      if (AppDataSource.isInitialized) return;

      await AppDataSource.initialize();
    } catch (error: any) {
      Alert.alert("Could not initialize database", error.message);
    } finally {
      setIsloading(false);
    }
  }

  if (isLoading) {
    return <LoadingView />
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </ThemeProvider>
  );
}
