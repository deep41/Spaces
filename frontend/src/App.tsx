import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage";
import { useEffect, useState } from "react";
import HomePage from "./components/homePage";
import ExplorePage from "./components/explorePage";
import NearPage from "./components/nearPage";
import Header from "./components/header";
import SpacePage from "./pages/Space/SpacePage";
import CommunitySearchPage from "./components/CommunitySearchPage";

function App() {
  // Check if the current route is the landing page
  const loc = useLocation();
  const [isLanding, setLanding] = useState(window.location.pathname === "/");
  useEffect(() => {
    setLanding(window.location.pathname === "/");
  }, [loc]);

  return (
    <>
      <div>
        {!isLanding && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/space" element={<SpacePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/community" element={<CommunitySearchPage />} />
          <Route path="/near" element={<NearPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
