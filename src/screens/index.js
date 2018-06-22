import { Navigation } from 'react-native-navigation';

import AuthScreen from './Auth/Auth';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('shopping-app.AuthScreen', () => AuthScreen);
}
