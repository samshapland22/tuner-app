import axios from "axios";
import { useState, useEffect } from "react";
import Song from "./Song";

const API = process.env.REACT_APP_API_URL;

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(API + "/songs")
      .then((res) => {
        console.log(res);
        setSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getTotal = () => {
  //   return songs.reduce((acc, song) => acc + song.run_time_seconds, 0);
  // };

  return (
    <div className="Songs">
      {/* <h2>Runtime Total: {getTotal().toFixed(2)}</h2> */}
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Song Title</th>
              <th>See Details</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => {
              return <Song key={song.id} song={song} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Songs;
