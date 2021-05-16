import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import CreateTodo from "../CreateTodo/CreateTodo";
import Todos from "../Todos/Todos";

function Home() {
  const { currentUser } = useSelector((state) => state.auth);
  const [currentId, setCurrentId] = useState(null);

  console.log(currentUser);

  if (!currentUser) {
    return (
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h2" align="center">
          You Have to Login First
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <CreateTodo currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid item md={8} xs={12}>
          <Todos currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(Home);
