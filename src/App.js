import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

function App() {
  const [nrOfSimulations, setNrOfSimulations] = useState(999);
  const handleRunSimulation = () => {
    axios
      .get("/montyhall", {
        params: {
          nrOfSimulations,
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
    setNrOfSimulations(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">Monty Hall Simulator</header>
      <div className="App-content">
        <Button variant="contained" onClick={handleRunSimulation}>
          Run simulation
        </Button>
        <TextField
          id="nrOfSimulations"
          value={nrOfSimulations}
          label="Number"
          type="number"
          onChange={handleNrOfSimulationsChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
