import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const baseURL = process.env.REACT_APP_API_KEY;
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const titleRef = useRef(null);
  const desRef = useRef(null);
  const titleURef = useRef(null);
  const desURef = useRef(null);
  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        quote: titleRef.current.value,
        author: desRef.current.value,
      })
      .then(function (response) {
        console.log(response);
        titleRef.current.value = "";
        desRef.current.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handelDelete = (id) => {
    axios.delete(`${baseURL}/${id}`).then((res) => {
      alert("Quote  Deleted");
    });
  };
  const handelOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handelUpdate = () => {
    axios
      .patch(`${baseURL}/${id}`, {
        quote: titleURef.current.value,
        author: desURef.current.value,
      })
      .then((response) => {
        alert("Quote updated");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app">
      <h1>API Modifier APP</h1>
      <form className="app__form">
        <h4>Enter Quote and Author</h4>
        <TextField
          margin="dense"
          id="title"
          label="Quote"
          inputRef={titleRef}
        />
        <TextField
          margin="dense"
          id="description"
          label="Author"
          inputRef={desRef}
        />
        <Button type="submit" onClick={handelSubmit}>
          Add Quote
        </Button>
      </form>
      <hr className="app__hr" />
      <div className="quote__list">
        <h3>All Quotes</h3>
        <div className="quote__container">
          {data.map((d, i) => (
            <div className="list">
              <div className="quote">
                <div className="quote__title quote__margin">
                  <h4>Quote:</h4>
                  <h5>{d.quote}</h5>
                </div>
                <div className="quote__title">
                  <h4>Author:</h4>
                  <p>{d.author}</p>
                </div>
              </div>
              <div className="quote__buttons">
                <Button color="primary" onClick={() => handelOpen(d._id)}>
                  Update
                </Button>
                <Button
                  color="secondary"
                  type="click"
                  onClick={() => handelDelete(d._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Quote Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Quote and Author</DialogContentText>
          <TextField
            autoFocus
            inputRef={titleURef}
            margin="dense"
            id="title"
            label="Quote"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={desURef}
            margin="dense"
            id="description"
            label="Author"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handelUpdate();
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
