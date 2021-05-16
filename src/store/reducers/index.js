import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

const reducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export default reducer;
