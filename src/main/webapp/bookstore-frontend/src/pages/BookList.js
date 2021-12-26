import { Button, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import AddFormDialog from "../components/AddFormDialog";
import DeleteDialogForm from "../components/DeleteFormDialog";
import EditFormDialog from "../components/EditFormDialog";
import EnhancedTable from "../components/Table";
import BookService from "../services/BookService";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    margin: " 5vh auto",
    height: "80vh",
  },
  header:{
    padding:" 30px 30px"
  },
  rightBtns:{
      display: "flex",
      direction:'row',
      justifyContent: "space-between",

  }
}));
const BookList = () => {
  const classes = useStyles();

  const handlePredict = () => {
      BookService.get(1)
      .then(response => {
          console.log(response);
      })
      .catch(e =>{
          console.log("error : ",e);
      })
  }

  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData)
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
          justify="space-around"
          className={classes.header}
          variant="outlined "
        >
          <Grid container item xs={9} direction="row">
            <Button variant="contained" size="small" onClick={handlePredict}>
              View book
            </Button>
          </Grid>
          <Grid container item xs={3} justify="flex-end" className={classes.rightBtns}>
            <AddFormDialog selectedData={selectedData}/>

             <EditFormDialog selectedData={selectedData} />
            
            <DeleteDialogForm selectedData={selectedData}/>
          </Grid>
        </Grid>
      </Grid>

      <EnhancedTable selectedData={selectedData} setSelectedData={setSelectedData}/>

    </Paper>
  );
};

export default BookList;
