import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

function CreateTodo({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const currentTodo = currentId
    ? todos.find((todo) => todo.id === currentId)
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await dispatch(actions.updateTodo(currentId, todo, setLoading));
    } else {
      await dispatch(actions.createTodo(todo, setLoading));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setTodo("");
  };

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo.todo.todo);
    }
  }, [currentTodo]);

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6">Create Todo</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="todo"
                label="Write Todo Here"
                fullWidth
                variant="outlined"
                required
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
          >
            {currentId
              ? `${loading ? "Updating Todo" : "Update Todo"}`
              : `${loading ? "Adding Todo" : "Add Todo"}`}
          </Button>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateTodo;
