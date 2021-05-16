import React, { useState } from "react";
import useStyles from "./styles";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import Modal from "../Modal/Modal";

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      actions.resetPassword(email, setLoading, setMessage, setShowModal)
    );

    setEmail("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            message={message}
            severity={
              message === "Reset link has been sent to your email address"
                ? "success"
                : "error"
            }
          />
        )}
        <Typography variant="h5">Password Reset</Typography>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
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
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </form>

        <Button component={Link} to="/login" type="button" fullWidth>
          Login now
        </Button>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
