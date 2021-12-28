import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/index";

const useStyles = makeStyles((theme) => ({
    paper: {
      width: "90%",
      margin: " 3vh auto",
      height: "85vh",
      padding: "20vh 0",
    },
    paper2: {
      width: "35%",
      margin: "auto",
      padding: "5vh 5vh",
    },
  }));

const Login = () => {

  const classes = useStyles();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const dispatch = useDispatch();

  const validateUser = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(user.email, user.password))
    // authenticateUser(user.email, user.password)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        resetLoginForm();
        setError("Invalid email and password");
      });
  };

  const resetLoginForm = () => {
    setUser(initialState);
    setShow(false);
  };
  
//   const handleSubmit = (e) => {
//       console.log(e.target.value);
//       validateUser();
//   };
  return (
      <>
      {/* {
          show ? <Alert severity="error">{error}</Alert> : null
      }  */}
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
            <Typography variant='h5' align="center">Login Form</Typography>
            <form onSubmit={validateUser}>
              <Grid container direction="column">
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
                    onClick={resetLoginForm}    
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
}
// const mapDispatchToProps = dispatch => ({
//     authenticateUser : (email,password) => dispatch(authenticateUser(email,password))
// })
// export default connect(null,mapDispatchToProps)(Login);

export default Login;
