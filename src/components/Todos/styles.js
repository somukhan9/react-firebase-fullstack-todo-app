import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  [theme.breakpoints.up("md")]: {
    loading: {
      minHeight: "88vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.down("sm")]: {
    loading: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export default useStyles;
