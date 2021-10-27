import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { chatReducer } from './reducer/chatReducer';
import thunk from 'redux-thunk';

const initialState = {
  chatDetails: {},
};
const reducer = combineReducers({
  chatDetail: chatReducer,
});

const composeEnhancer = compose;
const store = createStore(
  reducer,
  initialState as any,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
