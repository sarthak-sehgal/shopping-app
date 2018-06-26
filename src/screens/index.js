import { Navigation } from 'react-native-navigation';

import AuthScreen from './Auth/Auth';
import SignupScreen from './Auth/Signup';
import TopProducts from './TopProducts/TopProducts';
import AllProducts from './AllProducts/AllProducts';
import Cart from './Cart/Cart';

//connect screens with redux
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('shopping-app.AuthScreen', () => AuthScreen, store, Provider);
  Navigation.registerComponent('shopping-app.SignupScreen', () => SignupScreen, store, Provider);
  Navigation.registerComponent('shopping-app.TopProducts', () => TopProducts, store, Provider);
  Navigation.registerComponent('shopping-app.AllProducts', () => AllProducts, store, Provider);
  Navigation.registerComponent('shopping-app.Cart', () => Cart, store, Provider);
}
