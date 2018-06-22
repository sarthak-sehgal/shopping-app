import { Navigation } from 'react-native-navigation';

import AuthScreen from './Auth/Auth';
import SignupScreen from './Auth/Signup';
import TopProducts from './TopProducts/TopProducts';
import AllProducts from './AllProducts/AllProducts';
import Cart from './Cart/Cart';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('shopping-app.AuthScreen', () => AuthScreen);
  Navigation.registerComponent('shopping-app.SignupScreen', () => SignupScreen);
  Navigation.registerComponent('shopping-app.TopProducts', () => TopProducts);
  Navigation.registerComponent('shopping-app.AllProducts', () => AllProducts);
  Navigation.registerComponent('shopping-app.Cart', () => Cart);
}
