import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

function App() {
  const [state, setState] = useState({
    nrOfSimulations: 999,
    switchDoors: true,
  });
  const handleRunSimulation = () => {
    axios
      .get("/montyhall", {
        params: {
          nrOfSimulations: state.nrOfSimulations,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleNrOfSimulationsChange = (event) => {
    setState({ ...state, nrOfSimulations: event.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">Monty Hall Simulator</header>
      <div className="App-content">
        <TextField
          id="nrOfSimulations"
          value={state.nrOfSimulations}
          label="Number of simulations"
          type="number"
          onChange={handleNrOfSimulationsChange}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: 160 }}
        />
        <FormGroup row>
          <div id="App-switchDoorWrapper">
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.switchDoors}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Switch doors"
            />
          </div>
        </FormGroup>

        <Button variant="contained" onClick={handleRunSimulation}>
          Run simulation
        </Button>
      </div>
    </div>
  );
}

export default App;
