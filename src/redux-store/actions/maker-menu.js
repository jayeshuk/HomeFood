import {
  SELECT_DISH,
  DESELECT_DISH,
  ADD_DISH,
  DELETE_DISH,
  EDIT_DISH,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  TOGGLE_CATEGORY_MODAL,
  TOGGLE_DISH_MODAL,
  TOGGLE_CATEGORY_MENU,
  CHECK_DISH,
  CATEGORY_INPUT,
  DISH_INPUT,
  DISH_INPUT2,
} from './actionTypes';

export const selectDish = (id) => {
  return {
    type: SELECT_DISH,
  };
};

export const deselectDish = () => {
  return {
    type: DESELECT_DISH,
  };
};
export const addDish = () => {
  return {
    type: ADD_DISH,
  };
};
export const deleteDish = () => {
  return {
    type: DELETE_DISH,
  };
};

export const editDish = () => {
  return {
    type: EDIT_DISH,
  };
};
export const addCategory = (payload) => {
  return {
    type: ADD_CATEGORY,
    payload: payload,
  };
};
export const deleteCategory = () => {
  return {
    type: DELETE_CATEGORY,
  };
};
export const editCategory = () => {
  return {
    type: EDIT_CATEGORY,
  };
};

export const toggleCategoryModal = (boolval) => {
  return {
    type: TOGGLE_CATEGORY_MODAL,
    payload: boolval,
  };
};

export const toggleCategoryMenu = (boolval) => {
  return {
    type: TOGGLE_CATEGORY_MENU,
    payload: boolval,
  };
};

export const toggleDishModal = (boolval) => {
  return {
    type: TOGGLE_DISH_MODAL,
    payload: boolval,
  };
};

export const checkDish = (id) => {
  return {
    type: CHECK_DISH,
    payload: id,
  };
};
export const categoryInput = (text) => {
  return {
    type: CATEGORY_INPUT,
    payload: text,
  };
};
export const dishInput = (text) => {
  return {
    type: DISH_INPUT,
    payload: text,
  };
};
export const dishInput2 = (text) => {
  return {
    type: DISH_INPUT2,
    payload: text,
  };
};

// export const addPlace = (placeName) => {
//   return {
//     type: ADD_PLACE,
//     placeName: placeName,
//   };
// };
