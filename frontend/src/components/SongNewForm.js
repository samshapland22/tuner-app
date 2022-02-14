import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SongNewForm() {
  let navigate = useNavigate();

  const [song, setSong] = useState({
    song_name: "",
    artist: "",
    run_time_seconds: "",
    is_favorite: false,
  });

  const addSong = () => {
    axios
      .post(`${API}/songs`, song)
      .then(
        () => {
          navigate(`/songs`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSong();
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">song title:</label>
        <input
          id="song_name"
          value={song.song_name}
          type="text"
          onChange={handleTextChange}
          placeholder="song title"
          required
        />
        <label htmlFor="artist">artist:</label>
        <input
          id="artist"
          type="text"
          required
          value={song.artist}
          onChange={handleTextChange}
        />
        <label htmlFor="run_time_seconds">run time:</label>
        <input
          id="run_time_seconds"
          type="number"
          name="run_time_seconds"
          value={song.run_time_seconds}
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SongNewForm;
