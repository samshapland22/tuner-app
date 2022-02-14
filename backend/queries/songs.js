const pgPromise = require("pg-promise");
const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (err) {
    return err;
  }
};

const getAllSortedSongs = async (direction) => {
  try {
    let sqlQuery = pgPromise.as.format(
      "SELECT * FROM songs ORDER BY song_name ${direction:value}",
      { direction }
    );
    const allSongs = await db.any(sqlQuery);
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (err) {
    return err;
  }
};

const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (song_name, artist, run_time_seconds, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [song.song_name, song.artist, song.run_time_seconds, song.is_favorite]
    );
    return newSong;
  } catch (err) {
    return err;
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (err) {
    return err;
  }
};

const updateSong = async (id, song) => {
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET song_name=$1, artist=$2, run_time_seconds=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
      [song.song_name, song.artist, song.run_time_seconds, song.is_favorite, id]
    );
    return updatedSong;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllSongs,
  getAllSortedSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
};
