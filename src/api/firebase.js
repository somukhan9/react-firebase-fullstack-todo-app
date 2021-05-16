import { auth, db } from "../config/firebase";

const api = {
  singup: (email, password) =>
    auth.createUserWithEmailAndPassword(email, password),
  login: (email, password) => auth.signInWithEmailAndPassword(email, password),
  passwordReset: (email) => auth.sendPasswordResetEmail(email),
  logout: () => auth.signOut(),
  createTodo: (todo) => db.collection("todos").doc().set(todo),
  fetchTodo: (uid) =>
    db
      .collection("todos")
      .orderBy("createdAt", "desc")
      .where("uid", "==", uid)
      .get()
      .then((todos) =>
        todos.docs.map((todo) => ({
          id: todo.id,
          todo: todo.data(),
        }))
      ),
  updateTodo: (id, todo) =>
    db.collection("todos").doc(id).update({ todo: todo }),
  deleteTodo: (id) => db.collection("todos").doc(id).delete(),
};

export default api;
