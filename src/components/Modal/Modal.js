import React from "react";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

function Modal({ setShowModal, message, severity }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert
        severity={severity}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Typography variant="body2" align="center">
          {message}
        </Typography>
      </Alert>
    </div>
  );
}

export default Modal;
