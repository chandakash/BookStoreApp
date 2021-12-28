import { Button, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AddFormDialog from "../components/AddFormDialog";
import DeleteDialogForm from "../components/DeleteFormDialog";
import EditFormDialog from "../components/EditFormDialog";
import EnhancedTable from "../components/Table";
import BookService from "../services/BookService";
// import { connect } from "react-redux";
// import { fetchLanguages, fetchGenres } from "../services/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "90%",
    margin: " 3vh auto",
    height: "85vh",
  },
  header: {
    padding: " 30px 30px",
  },
  rightBtns: {
    display: "flex",
    direction: "row",
    justifyContent: "space-between",
  },
}));
const BookList = () => {
  const classes = useStyles();
  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  const handlePredict = () => {
    BookService.get(1)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  };

  const fetchGenreList = async () => {
    try {
      const result = await BookService.getGenre();
      setGenreList(result.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchLanguageList = async () => {
    try {
      const result = await BookService.getLanguage();
      setLanguageList(result.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchGenreList();
    fetchLanguageList();

    return () => {};
  }, []);
  
  return (
    <Paper
      elevation={3}
      className={classes.paper}
      style={{ background: "#97A1A9" }}
    >
      <Grid container item xs={12}>
        <Grid
          container
          //   direction="row"
          // justify="space-around"
          className={classes.header}
          variant="outlined "
        >
          <Grid container item xs={9} direction="row">
            <Button variant="contained" size="small" onClick={handlePredict}>
              View book
            </Button>
          </Grid>
          <Grid
            container
            item
            xs={3}
            justify="flex-end"
            className={classes.rightBtns}
          >
            <AddFormDialog languageList={languageList} genreList={genreList} />

            <EditFormDialog languageList={languageList} genreList={genreList} />

            <DeleteDialogForm />
          </Grid>
        </Grid>
      </Grid>

      <EnhancedTable />
    </Paper>
  );
};

// const mapStateToProps = (state) => {
//   return {
//       savedBookObject : state.book
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchGenreList: () => dispatch(fetchGenres()),
//     fetchLanguageList: () => dispatch(fetchLanguages()),
//   };
// };

export default BookList;
