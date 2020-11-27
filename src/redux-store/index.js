import {createStore, combineReducers} from 'redux';
import makerMenu from './reducers/maker-menu';

const rootReducer = combineReducers({
  maker_menu: makerMenu,
});

// const configureStore = createStore(rootReducer, initialState);

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
