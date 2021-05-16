import React from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Todo({ todoDoc, index, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteTodo = () => {
    dispatch(actions.deleteTodo(todoDoc.id));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8} className={classes.todo}>
          <Typography variant="subtitle2">
            {index + 1}.&nbsp;{todoDoc.todo.todo}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="primary"
            onClick={() => {
              setCurrentId(todoDoc.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={deleteTodo}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Todo;
