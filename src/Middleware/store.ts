import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import {
  chatReducer,
  isMobileReducer,
  showMenuReducer,
} from './reducer/chatReducer';
import thunk from 'redux-thunk';

const initialState = {
  chatDetails: {},
  showMenu: true,
};
const reducer = combineReducers({
  chatDetail: chatReducer,
  isMobile: isMobileReducer,
  showMenu: showMenuReducer,
});

const composeEnhancer = compose;
const store = createStore(
  reducer,
  initialState as any,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
