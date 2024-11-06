import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";

// endpoint별로 렌더링

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/main/bucket" element={<MainPage />} />
        <Route path="/main/bucket/:folderId" element={<MainPage />} />
        <Route path="/main/link" element={<MainPage />} />
        <Route path="/main/texts" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;