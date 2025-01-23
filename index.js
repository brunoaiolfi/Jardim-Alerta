import 'react-native-gesture-handler';
import 'reflect-metadata';

import { AppRegistry, LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state', 'Require cycle:']);

import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
