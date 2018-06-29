import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import productsReducer from './reducers/products';

export default configureStore = () => {
    let composeEnhancers = compose;

    if(__DEV__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const rootReducer = combineReducers({
        auth: authReducer,
        ui: uiReducer,
        products: productsReducer
    });
    
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}