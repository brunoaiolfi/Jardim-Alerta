import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { Routes } from '@/src/ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from '@/src/ui/themes/lightTheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  return (
    <ThemeProvider theme={lightTheme}>
      <Routes />
    </ThemeProvider>
  );
}
