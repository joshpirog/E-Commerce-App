import { combineReducers } from 'redux';
import productReducer from './products/Products.reducers';


export default combineReducers({
    products: productReducer
});