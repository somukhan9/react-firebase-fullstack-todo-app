import React from "react";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
} from "@material-ui/core";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(actions.logout(history));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Container component="div" maxWidth="md">
          <Toolbar className={classes.toolBar}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              iTodo
            </Typography>

            {currentUser ? (
              <>
                <div className={classes.avatar}>
                  {currentUser.photoURL ? (
                    <Avatar
                      alt={currentUser.displayName}
                      src={currentUser.photoURL}
                    />
                  ) : (
                    <Avatar className={classes.purple}>
                      {currentUser.email.substring(0, 1)}
                    </Avatar>
                  )}
                </div>
                <Button color="secondary" variant="outlined" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
