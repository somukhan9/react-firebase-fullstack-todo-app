import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Login from "./components/LogIn/Login";
import Signup from "./components/SignUp/Signup";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions";
import useStyles from "./styles";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = dispatch(actions.setCurrentUser(setLoading));
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return (
      <Container className={classes.loading}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/verify_email" component={EmailVerification} />
        <Route exact path="/reset_password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
