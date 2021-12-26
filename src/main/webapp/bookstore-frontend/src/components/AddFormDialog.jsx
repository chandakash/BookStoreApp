import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import BookService from '../services/BookService'
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
  dailogBox: {
    // width: 500,
    // height: 500,
    backgroundColor: theme.palette.primary.dark,
  },
  TextField: {
    width: 250,
    color: "white",
    // padding: '0px 0px',
    fontSize: "1rem",
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: "10px",
    // opacity: "1",
    backgroundColor: theme.palette.primary.light,
    borderColor: "#356680",
  },
  label: {
    color: "#97A1A9",
  },
}));

const AddFormDialog = ({selectedData}) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState(0.0);
  const [language, setLanguage] = useState("English");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
    var data = {
        title : title,
        author : author,
        coverPhotoURL: coverPhotoUrl,
        isbnNumber: isbn,
        price: price,
        language: language,
        genre: genre,
        publishedDate: publishedDate
    }
    BookService.create(data)
        .then(response => {
            console.log(response.data)
            handleClose();
        })
        .catch(e => {
            console.log(e)
            handleClose();
        });

    // alert("for submitted successfully");

  };
  const classes = useStyles();
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} disabled={selectedData.length ? true : false}>
        <AddIcon fontSize="small"/> Add
      </Button>

      <Dialog open={open} onClose={handleClose} className={classes.dailogBox}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Add a book to the library</DialogContentText> */}
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                direction="row"
                //   style={{ maxWidth: "60%" }}
              >
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="author"
                    label="Author"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="coverPhotoUrl"
                    label="Cover Photo URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={coverPhotoUrl}
                    onChange={(e) => setCoverPhotoUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="isbn"
                    label="ISBN"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Price"
                    type="number"
                    fullWidth
                    required
                    variant="standard"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      autoFocus
                    margin="dense"
                    id="language"
                    label="Language"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="genre"
                    label="Genre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="publishedDate"
                    label="Published Date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFormDialog;
