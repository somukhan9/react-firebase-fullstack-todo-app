import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import * as actions from "../../store/actions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";

import Modal from "../Modal/Modal";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.login(formState, setMessage, setShowModal, setLoading, history)
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            message={message}
            severity="error"
          />
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                type="text"
                name="email"
                label="Email Address"
                fullWidth
                variant="outlined"
                required
                value={formState.email}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                required
                value={formState.password}
                onChange={handleChange}
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
            {loading ? "Logging In..." : "Login"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to="/reset_password" type="button">
                Forgot Password ?
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to="/signup" type="button">
                Don't have any account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
