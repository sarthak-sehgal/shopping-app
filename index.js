import { AppRegistry } from 'react-native';
import App from './App';

// all the redux stuff
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import authReducer from './src/store/reducers/auth';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const ShoppingApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('shoppingapp', () => ShoppingApp);
