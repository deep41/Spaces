import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage";
import { useState } from "react";
import HomePage from "./components/homePage";
import SpacePage from "./components/spacePage";
import ExplorePage from "./components/explorePage";
import NearPage from "./components/nearPage";
import Header from "./components/header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/space" element={<SpacePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/near" element={<NearPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
