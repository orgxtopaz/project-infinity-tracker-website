import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.
import { useNavigate } from 'react-router-dom';

import Header from "../../component/private-page-header";
import Footer from "../../component/private-page-footer";
//set style for Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const [allCreativities, setAllCreativities] = React.useState([]);
  const [activitiesCount, setActivitiesCount] = React.useState(0);
  const [todays, setTodays] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  React.useEffect(() => {  
   
    if("email" in localStorage && "password" in localStorage){
      Axios.post("http://localhost:5000/verifyUser",
        
      {
      
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
    

       
      })
        .then((res) => {  

          alert(res.response.data.message)

         
        }) 
        .catch ((err) => {
         
      
        
         
          alert(err.response.data.message)
          navigate('/internal-access');

  
        })
      
     }else{
       alert("You must log in first!")
       navigate('/internal-access');

     }



    fetch("http://localhost:5000/api/v1/creativities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAllCreativities(data.data);
      });

    fetch("http://localhost:5000/api/v1/activities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let allActivities = data.data;

        let today = new Date();
        let todayDate = today.getDate();

        const todaysActivites = allActivities.filter((act) => {
          let actDate = new Date(act.createdAt);
          if (todayDate === actDate.getDate()) {
            return act;
          }
        });

        setTodays(todaysActivites.length);

        setActivitiesCount(data.count);
      });
  }, []);
  return (
    <div class="container">
      <Header />

      <div class="main-content">
        <main>
          <div class="cards">
            <div class="card-single">
              <div>
                <span>Today's activities</span>
                <h1>{todays}</h1>
              </div>
              <div>
                <span class="las la-running"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Types of activities recorded</span>
                <h1>{activitiesCount}</h1>
              </div>
              <div>
                <span class="las la-tasks"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Total duration recorded</span>
                <h1>10 hours 22 mins</h1>
              </div>
              <div>
                <span class="las la-stopwatch"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Total activities recorded</span>
                <h1>{allCreativities.length}</h1>
              </div>
              <div>
                <span class="las la-bookmark"></span>
              </div>
            </div>
          </div>

          <div class="recent-grid">
            <div class="activitie-table">
              <div class="card">
                <div class="card-header">
                  <h2>Recent activities</h2>

                  <Button variant="outlined">
                    Next page <span class="las la-arrow-right"></span>
                  </Button>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Date</td>
                          <td>Activity types</td>
                          <td>Description</td>
                          <td>Duration</td>
                        </tr>
                      </thead>
                      <tbody>
                        {allCreativities.map((cty) => {
                          return (
                            <tr>
                              <td>{cty.date}</td>
                              <td>{cty.activity.activityTitle}</td>
                              <td>{cty.description}</td>
                              <td>{(cty.duration / 60).toFixed(2)} hours</td>
                              <td>
                                <Button variant="outlined" onClick={handleOpen}>
                                  More Info.
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update Activity
            </Typography>
            <br />
            <br />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Date"
              variant="outlined"
            />
            <br />
            <br />
            <div className="input-box">
              <select>
                <option disabled selected value>
                  -- select activity --
                </option>
                <option value="Run">Run</option>
                <option value="Bicycle Ride">Bicycle Ride</option>
                <option value="Swim">Swim</option>
                <option value="Walk">Walk</option>
                <option value="Hike">Hike</option>
              </select>
            </div>
            <br />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Duration"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Location"
              variant="outlined"
            />
            <br />
            <br />
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleClose}>
                Delete
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Update
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Footer></Footer>
    </div>
  );
}
