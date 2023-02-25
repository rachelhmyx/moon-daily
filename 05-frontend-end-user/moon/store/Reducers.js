import { ACTIONS } from "./Actions";

export const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    // case ACTIONS.ADD_MODALFAVOURITE:
    //   return {
    //     ...state,
    //     modalfavourite: action.payload,
    //   };
    case ACTIONS.ADD_FAVOURITE:
      return {
        ...state,
        favourite: action.payload,
      };
    default:
      return state;
  }
};
