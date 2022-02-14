const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  getAllSortedSongs,
} = require("../queries/songs.js");

songs.get("/", async (req, res) => {
  try {
    let allSongs;
    if (req.query.order) {
      allSongs = await getAllSortedSongs(req.query.order);
    } else {
      allSongs = await getAllSongs();
    }
    // if (allSongs[0]) {
    res.status(200).json(allSongs);
    // } else {
    //   res.status(500).json({ error: "server error" });
    // }
  } catch (err) {
    console.log(err);
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await getSong(id);
    if (song.id) {
      res.status(200).json(song);
    } else {
      res.status(500).json({ error: "song not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

songs.post("/", async (req, res) => {
  try {
    const createdSong = await createSong(req.body);
    if (createdSong.id) {
      res.status(200).json(createdSong);
    } else {
      res.status(500).json({ error: "song creation error" });
    }
  } catch (err) {
    console.log(err);
  }
});

songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json({ error: "song not found" });
  }
});

songs.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSong = await updateSong(id, req.body);
  if (updatedSong.id) {
    res.status(200).json(updatedSong);
  } else {
    res.status(404).json({ error: "song not found" });
  }
});

module.exports = songs;
