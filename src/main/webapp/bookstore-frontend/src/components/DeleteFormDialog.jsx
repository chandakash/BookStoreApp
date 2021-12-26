import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import BookService from '../services/BookService';

const useStyles = makeStyles((theme) =>({
    // root:{
    //     width:540,
    //     height:500,
    //     margin:'auto',
    // },
    // deletemain: {
    //     marginLeft: theme.spacing(1)
    // },
    // paper:{
    //     backgroundColor:theme.palette.primary.dark
    // },
    // colorTextPrimary:{
    //     color:'white'
    // },
    // cancel: {
    //     marginLeft: theme.spacing(1),
    //     border: `1px solid ${theme.palette.secondary.main}`,
    //     color:'white',
    //     background:'#273D49CC'
    // },
    // delete: {
    //     marginRight: theme.spacing(1),
    //     color:"white"
    //   },
}))

export default function DeleteDialogForm({selectedData}) {
    
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(16)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
//   const handleRemove = () => {
//     props.onChange(!props.remove);
//   };

  const handleDelete = () =>{
    
    // const ids=props.selected
    // console.log(ids)

    BookService.delete(selectedData[0].bookId)
      .then(response => {
          console.log(response);
          handleClose();
      })
      .catch(e =>{
          console.log("error : ",e);
          handleClose();
      })
      // try{
      //   const delData = async (ids)=>{
      //     const response = await axios.post(`http://localhost:8081/1805096/DeleteData`,{ids});
      //     console.log(response);
      //   }
      //   delData(ids);
      // }catch(error){
      //   console.log(error);
      // }

    //   async function makePostRequest() {

    //     let params = {
    //         DocId:props.selected
    //       }
    
    //     let res = await axios.post('http://localhost:8081/1805096/DeleteData/', params);
    
    //     console.log(res.data);
    // }
    
      // makePostRequest();
  }
  
  return (
    <>
      
      <Button
        variant="outlined"
        color="primary"
        size="small"
        // className={classes.deletemain}
        onClick={handleClickOpen}
        disabled = {selectedData.length ===1 ? false : true}
        >
        <RemoveIcon fontSize="small" /> Delete
      </Button>
      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} 
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography  style={{color:'black'}}>
            Delete record(s)?
        </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="body2" style={{color:'black'}}>
            You'll lose your record(s) after this action. we can't recover
            them once you delete.
          </Typography>
          
          <Typography gutterBottom variant="body2" style={{color:'black'}}>
            Are you sure you want to <span style={{color:'#FF5E5E'}}>permanently delete</span> them?
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button
            variant="contained"
            // color="#273D49CC"
            size="small"
            onClick={handleClose}
        >
           Cancel
        </Button>
        <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleDelete}
        >
            Delete
        </Button>


        </DialogActions>
      </Dialog>
    </>
  );
}