import NewPage from "./pages/NewRace";
import RacePage from "./pages/RacePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="/:race" element={<RacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
