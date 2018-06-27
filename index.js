import { AppRegistry } from 'react-native';
import App from './App';
App();

// all the redux stuff
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';

// firebase setup
// import * as firebase from 'firebase';
// var config = {
//     apiKey: "AIzaSyBfJb3j_EzNwrJPGVtCj77QiC_D-k6y53w",
//     authDomain: "native-shopping-app.firebaseapp.com",
//     databaseURL: "https://native-shopping-app.firebaseio.com",
//     projectId: "native-shopping-app",
//     storageBucket: "native-shopping-app.appspot.com",
//     messagingSenderId: "910187357930"
// };
// firebase.initializeApp(config);

const store = configureStore();

const ShoppingApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('shoppingapp', () => ShoppingApp);
