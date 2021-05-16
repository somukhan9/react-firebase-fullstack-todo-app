import React from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector } from "react-redux";

function EmailVerification() {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5">No User Found For Verification</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">
          We have sent a verification mail to your email. Please verify your
          email and enjoy the application
        </Typography>
      </Paper>
    </Container>
  );
}

export default EmailVerification;
