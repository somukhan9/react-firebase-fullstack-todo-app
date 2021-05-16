import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";

const formUserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState();
  const [formState, setFormState] = useState(formUserState);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      actions.singup(formState, setShowModal, setMessage, setLoading, history)
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
        <Typography variant="h5">Signup</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
                required
                value={formState.firstName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
                required
                value={formState.lastName}
                onChange={handleChange}
              />
            </Grid>
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
            <Grid item xs={12} sm={12}>
              <TextField
                type="password"
                name="confirmPassword"
                label="Repeat Password"
                fullWidth
                variant="outlined"
                required
                value={formState.confirmPassword}
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
            {loading ? "Creating User" : "Signup"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to="/login" type="button">
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
