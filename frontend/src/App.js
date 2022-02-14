import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SongEditForm from "./components/SongEditForm";
import FourOFour from "./components/FourOFour";
import Home from "./components/Home";
import Songs from "./components/Songs";
import SongNewForm from "./components/SongNewForm";
import SongDetails from "./components/SongDetails";

// COMPONENTS
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/new" element={<SongNewForm />} />
            <Route exact path="/songs/:id" element={<SongDetails />} />
            <Route path="/songs/:id/edit" element={<SongEditForm />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
