import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landing_page";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
