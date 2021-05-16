import { auth } from "../../config/firebase";
import api from "../../api/firebase";
import {
  SIGN_UP,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
  FETCH_TODOS,
} from "../../constants/actionTypes";

export const singup =
  (formState, setShowModal, setMessage, setLoading, history) =>
  async (dispatch) => {
    try {
      setLoading(true);
      if (formState.password !== formState.confirmPassword) {
        setShowModal(true);
        setLoading(false);
        return setMessage("Passwords did not match");
      }
      const { user } = await api.singup(formState.email, formState.password);
      user.updateProfile({
        displayName: formState.firstName + " " + formState.lastName,
      });
      dispatch({ type: SIGN_UP, payload: { user: user } });
      await user.sendEmailVerification();
      history.push("/verify_email");
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setLoading(false);
      if (error.code === "auth/invalid-email") {
        console.log("This email is not valid");
        return setMessage("This email is not valid");
      }
      if (error.code === "auth/email-already-in-use") {
        console.log("This email has already taken");
        return setMessage("This email has already taken");
      }
      if (error.code === "auth/weak-password") {
        console.log("Password should be at least 6 characters");
        return setMessage("Password should be at least 6 characters");
      }
    }
  };

export const login =
  (formState, setMessage, setShowModal, setLoading, history) =>
  async (dispatch) => {
    try {
      setLoading(true);
      const { user } = await api.login(formState.email, formState.password);
      dispatch({ type: LOGIN, payload: { user: user } });
      history.push("/");
      setLoading(false);
    } catch (error) {
      setShowModal(true);
      setLoading(false);

      if (error.code === "auth/invalid-email") {
        return setMessage("This email is invalid");
      }
      if (error.code === "auth/user-not-found") {
        return setMessage("User not found");
      }
      if (error.code === "auth/wrong-password") {
        return setMessage("Invalid credentials");
      }
    }
  };

export const resetPassword =
  (email, setLoading, setMessage, setShowModal) => async (dispatch) => {
    try {
      setLoading(true);
      await api.passwordReset(email);

      setMessage("Reset link has been sent to your email address");
      setShowModal(true);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setShowModal(true);
      setLoading(false);
    }
  };

export const logout = (history) => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT, payload: { user: null } });
    history.push("/login");
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentUser = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    await auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: SET_CURRENT_USER, payload: { user: user } });
        setLoading(false);
      } else {
        dispatch({ type: SET_CURRENT_USER, payload: { user: null } });
        setLoading(false);
      }
    });
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const fetchTodos = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const todos = await api.fetchTodo(auth.currentUser.uid);
    dispatch({ type: FETCH_TODOS, payload: { todos: todos } });
    // console.log(todos);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const createTodo = (todo, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    await api.createTodo({
      todo: todo,
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });
    const todos = await api.fetchTodo(auth.currentUser.uid);
    dispatch({ type: FETCH_TODOS, payload: { todos: todos } });
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const updateTodo = (id, todo, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    await api.updateTodo(id, todo);
    const todos = await api.fetchTodo(auth.currentUser.uid);
    dispatch({ type: FETCH_TODOS, payload: { todos: todos } });
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);
    const todos = await api.fetchTodo(auth.currentUser.uid);
    dispatch({ type: FETCH_TODOS, payload: { todos: todos } });
  } catch (error) {
    console.log(error);
  }
};
