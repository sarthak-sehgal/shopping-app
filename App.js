import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/screens/index';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'shopping-app.AuthScreen',
    title: 'Login'
  }
});
