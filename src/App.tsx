import "reflect-metadata";
import 'react-native-reanimated';
import { Routes } from './ui/routes';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './ui/themes/lightTheme';
import { UserProvider } from './ui/contexts/userContext';
import { LogBox } from 'react-native';

// Ignorar todos os warnings
LogBox.ignoreAllLogs();

export default function App() {

  return (
    <ThemeProvider theme={lightTheme}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </ThemeProvider>
  );
}
