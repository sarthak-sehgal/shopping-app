import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/screens/index';

registerScreens();

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'shopping-app.AuthScreen',
    title: 'Login'
  }
});
