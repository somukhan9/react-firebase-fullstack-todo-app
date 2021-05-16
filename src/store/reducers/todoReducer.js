import { FETCH_TODOS } from "../../constants/actionTypes";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: action.payload.todos };

    // case CREATE_TODO:
    //   return { ...state, todos: [...state.todos, action.payload.todo] };

    default:
      return state;
  }
};
export default todoReducer;
