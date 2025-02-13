import "reflect-metadata";
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Routes } from './infra/ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './infra/ui/themes/lightTheme';
import { UserProvider } from './infra/ui/contexts/userContext';
import { Alert } from "react-native";
import { AppDataSource } from "./infra/database";
import { LoadingView } from "./infra/ui/views/loading";
import { getDatabaseContextImplementation } from "./infra/implementations/database/context/factory";

export default function App() {

  const databaseContext = getDatabaseContextImplementation();

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    initializeDatabase();
  }, [])

  async function initializeDatabase() {
    try {
      if (AppDataSource.isInitialized) return;

      await databaseContext.initialize();
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
