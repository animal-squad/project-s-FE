import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Join from "./Pages/JoinPage";
import MainPage from "./Pages/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;