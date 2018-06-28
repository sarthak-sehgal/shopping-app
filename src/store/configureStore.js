import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';

export default configureStore = () => {
    const rootReducer = combineReducers({
        auth: authReducer,
        ui: uiReducer
    });
    
    return createStore(rootReducer, applyMiddleware(thunk));
}