import React, { useState, useEffect } from "react";
import Todo from "./Todo/Todo";
import useStyles from "./styles";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

function Todos({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = dispatch(actions.fetchTodos(setLoading));
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return (
      <Container className={classes.loading}>
        <CircularProgress />
      </Container>
    );
  }

  if (todos.length === 0) {
    return (
      <Container className={classes.loading}>
        <Typography variant="h4" align="center">
          No Todo Available
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        {todos.map((todoDoc, index) => {
          return (
            <Todo
              key={todoDoc.id}
              todoDoc={todoDoc}
              index={index}
              setCurrentId={setCurrentId}
            />
          );
        })}
      </Paper>
    </Container>
  );
}

export default Todos;
