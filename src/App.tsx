import "reflect-metadata";
import 'react-native-reanimated';
import { Routes } from './ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './ui/themes/lightTheme';
import { UserProvider } from './ui/contexts/userContext';
import { LogBox } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Ignorar todos os warnings
LogBox.ignoreAllLogs();

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        retry: 2,
        refetchOnWindowFocus: false,
      },
    }
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Routes />
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
