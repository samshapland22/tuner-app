const cors = require("cors");
const express = require("express");

const songsController = require("./controllers/songsController.js");

const app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Welcome to Tuner App");
});

app.use("/songs", songsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
