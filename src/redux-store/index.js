import {createStore, combineReducers} from 'redux';
import makerMenu from './reducers/maker-menu';
import mainApp from './reducers/main-app';

const rootReducer = combineReducers({
  maker_menu: makerMenu,
  main_app: mainApp,
});

// const configureStore = createStore(rootReducer, initialState);

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
