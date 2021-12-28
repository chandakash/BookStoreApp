import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/index";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
// import MyToast from "../MyToast";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "90%",
    margin: " 3vh auto",
    height: "85vh",
    padding: "10vh 0",
  },
  paper2: {
    width: "35%",
    margin: "auto",
    padding: "5vh 5vh",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    // confirmPassword:"",
  };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const dispatch = useDispatch();

  const saveUser = (e) => {
      e.preventDefault();
    dispatch(registerUser(user))
      .then((response) => {
        setShow(true);
        setMessage(response.message);
        resetRegisterForm();
        setTimeout(() => {
          setShow(false);
          navigate('/login')
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
  };

//   const handleSubmit = (e) => {
//     // e.prevent.default();
//     console.log(e);
//     saveUser();
//   };

  return (
    <>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{ background: "#97A1A9" }}
      >
        <Paper
          elevation={5}
          className={classes.paper2}
          style={{ background: "#424E63" }}
        >
          <Grid
            container
            item
            xs={12}
            direction="column"
            style={{ width: "50vw" }}
          >
            <Typography variant='h5' align="center">Registration Form</Typography>
            <form onSubmit={saveUser}>
              <Grid container direction="column">
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={user.name}
                    onChange={userChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={userChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="mobile"
                    label="Contact"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={user.mobile}
                    onChange={userChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={userChange}
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={userChange}
                  />
                </Grid> */}
              </Grid>
              <hr></hr>
              <Grid container rowSpacing={6} direction="row">
                <Grid item xs={9}>
                  <Button variant="contained" color="secondary" type="sumit">
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={resetRegisterForm}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Paper>
    </>
  );
};

export default Register;
