import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';

export default configureStore = () => {
    const rootReducer = combineReducers({
        auth: authReducer
    });
    
    return createStore(rootReducer, applyMiddleware(thunk));
}