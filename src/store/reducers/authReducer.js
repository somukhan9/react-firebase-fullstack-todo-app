import {
  SIGN_UP,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
} from "../../constants/actionTypes";

const initialState = {
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, currentUser: action.payload.user };

    case LOGIN:
      return { ...state, currentUser: action.payload.user };

    case LOGOUT:
      return { ...state, currentUser: action.payload.user };

    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload.user };

    default:
      return state;
  }
};

export default authReducer;
