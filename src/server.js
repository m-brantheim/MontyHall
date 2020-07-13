const express = require("express");
const path = require("path");
const { runSimulation } = require("./montyHall");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/montyhall", function (req, res) {
  const { nrOfSimulations } = req.query;
  const results = runSimulation(nrOfSimulations);
  return res.send(results);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
