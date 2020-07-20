const express = require("express");
const path = require("path");
const { runSimulation } = require("./montyHall");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/montyhall", function (req, res) {
  const nrOfSimulationsString = req.query.nrOfSimulations;
  const nrOfSimulations = parseInt(nrOfSimulationsString, 10);
  const isOneOrHigher = nrOfSimulations >= 1;
  console.log(isOneOrHigher);
  if (!nrOfSimulations || !isOneOrHigher) {
    return res.send({
      nrOfNoSwitchWins: null,
      nrOfSwitchWins: null,
      errorMessage:
        "You must send the nrOfSimulations parameter, as an integer >= 3.",
    });
  }
  const results = runSimulation(nrOfSimulations);
  return res.send(results);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);

module.exports = app;
