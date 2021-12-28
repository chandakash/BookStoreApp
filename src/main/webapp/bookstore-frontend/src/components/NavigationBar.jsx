import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // color:"secondary"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bookIcon: {
    // margin: "-1rem 5px",
    backgroundColor: "white",
    color: "red",
    marginRight: "1rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  // color:"red"
};

const NavigationBar = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          LOGIN
        </Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none",marginRight:"1rem"}}>
        <Button variant="contained">REGISTER</Button>
      </Link>
    </>
  );

  const userLinks = (
    <>
      <Link to="/userlist" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          USERLIST
        </Button>
      </Link>
      <Link to="/booklist" style={{ textDecoration: "none" }}>
        <Button variant="contained">BookList</Button>
      </Link>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div style={headerStyle}>
            <Link to="/">
              <BookIcon fontSize="large" className={classes.bookIcon} />
            </Link>
            <Typography variant="h6" component="div" marginRight="10px">
              BOOK STORE
            </Typography>
            {/* {auth.isloggedIn ? userLinks : null} */}
            {auth.isloggedIn ? null : userLinks}
          </div>
          <div>
            {auth.isloggedIn ? null : guestLinks}
            {auth.isloggedIn ? null : (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" onClick={logout}>Logout</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
