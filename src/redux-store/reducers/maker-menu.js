import {produce} from 'immer';
import {
  SELECT_DISH,
  DESELECT_DISH,
  ADD_DISH,
  DELETE_DISH,
  EDIT_DISH,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  CHECK_DISH,
  TOGGLE_CATEGORY_MODAL,
  TOGGLE_DISH_MODAL,
  TOGGLE_CATEGORY_MENU,
  CATEGORY_INPUT,
  DISH_INPUT,
  DISH_INPUT2,
} from '../actions/actionTypes';

const initialState = {
  menu: [
    {
      categoryId: 0,
      categoryName: 'Pickels and Chutneys',
      dishes: [
        {
          id: 0,
          name: 'Mango Pickle',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Jawas Chutney',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Groundnut Chutney',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
    {
      categoryId: 1,
      categoryName: 'Breads',
      dishes: [
        {
          id: 0,
          name: 'Chapati',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 1,
          name: 'Bhakri',
          available: false,
          description: 'Made with love for foodies',
        },
        {
          id: 2,
          name: 'Phulka',
          available: false,
          description: 'Made with love for foodies',
        },
      ],
    },
  ],
  CategoryModal: false,
  DishModal: false,
  CategoryMenu: false,
  Tooltip: false,
  newCategoryTitle: '',
  newDishTitle: '',
  newDishDescription: '',
};

const maker_menu = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_INPUT:
      return produce(state, (newState) => {
        console.log(action.payload);
        newState.newCategoryTitle = action.payload;
      });
    case ADD_CATEGORY:
      return produce(state, (newState) => {
        newState.menu.push({
          categoryName: action.payload,
          dishes: null,
        });
        newState.newCategoryTitle = '';
      });

    case CHECK_DISH:
      return produce(state, (newState) => {
        newState.menu[action.payload.catId].dishes[
          action.payload.dishId
        ].available = true;
      });
    case TOGGLE_CATEGORY_MODAL:
      return produce(state, (newState) => {
        // console.log(action.payload);
        newState.CategoryModal = action.payload;
      });
    case TOGGLE_CATEGORY_MENU:
      return produce(state, (newState) => {
        newState.CategoryMenu = action.payload;
      });
    case TOGGLE_DISH_MODAL:
      return produce(state, (newState) => {
        newState.DishModal = action.payload;
      });
    case DISH_INPUT:
      return produce(state, (newState) => {
        // console.log(action.payload);
        newState.newDishTitle = action.payload;
      });
    case DISH_INPUT2:
      return produce(state, (newState) => {
        console.log(action.payload);
        newState.newDishDescription = action.payload;
      });

    case ADD_DISH:
      return produce(state, (newState) => {
        newState.menu.push({
          title: action.payload.title,
          dishes: null,
        });
        newState.newDishTitle = '';
        newState.newDishDescription = '';
      });

    default:
      return state;
  }
};

export default maker_menu;
