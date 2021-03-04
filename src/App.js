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
  const baseURL = "http://localhost:3000/posts/";
  const [toggle, setToggle] = useState(false);
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
  }, [toggle]);
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        title: titleRef.current.value,
        description: desRef.current.value,
      })
      .then(function (response) {
        console.log(response);
        setToggle(!toggle);
        titleRef.current.value = "";
        desRef.current.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handelDelete = (id) => {
    axios.delete(`${baseURL}/${id}`).then((res) => {
      setToggle(!toggle);
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
        title: titleURef.current.value,
        description: desURef.current.value,
      })
      .then((response) => {
        console.log(response);
        setToggle(!toggle);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app">
      <h1>Course Details</h1>
      <form className="app__form">
        <h4>Enter Title and Description of the course</h4>
        <TextField
          margin="dense"
          id="title"
          label="Title"
          inputRef={titleRef}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          inputRef={desRef}
        />
        <Button type="submit" onClick={handelSubmit}>
          Add Course
        </Button>
      </form>
      <div className="course__list">
        <h3>All Courses Available</h3>
        <div className="course__container">
          {data.map((d, i) => (
            <div className="list">
              <div className="course">
                <div className="course__title course__margin">
                  <h4>Course Title:</h4>
                  <h5>{d.title}</h5>
                </div>
                <div className="course__title">
                  <h4>Course Description:</h4>
                  <p>{d.description}</p>
                </div>
              </div>
              <div className="course__buttons">
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
        <DialogTitle id="form-dialog-title">Update Course Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Title and Description</DialogContentText>
          <TextField
            autoFocus
            inputRef={titleURef}
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            inputRef={desURef}
            margin="dense"
            id="description"
            label="Description"
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
