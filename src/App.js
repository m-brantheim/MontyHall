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
    responseText: "",
  });

  const getResponseText = (response) => {
    if (state.switchDoors) {
      return `You switched door and won ${response.nrOfSwitchWins} times!
        Keeping the door would have won  ${response.nrOfNoSwitchWins} times.`;
    }
    return `You kept your door and won ${response.nrOfNoSwitchWins} times!
    Switching door would have won  ${response.nrOfSwitchWins} times.`;
  };
  const handleRunSimulation = () => {
    axios
      .get("/montyhall", {
        params: {
          nrOfSimulations: state.nrOfSimulations,
        },
      })
      .then(function (response) {
        setState({ ...state, responseText: getResponseText(response.data) });
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

  const handleSwitchDoorsChange = () => {
    setState({ ...state, switchDoors: !state.switchDoors });
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
                  onChange={handleSwitchDoorsChange}
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
        <p>{state.responseText}</p>
      </div>
    </div>
  );
}

export default App;
