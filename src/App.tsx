import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import UnsharedPage from "./Pages/UnsharedPage";
import { ImagesSliderDemo } from "./Pages/LandingPage";
import PrivacyPolicy from "./Pages/PrivacyPolicyPage";
import Bucket_view from "./components/NewComponent/Bucket_View";
import Bucket_Insideview from "./components/NewComponent/Bucket_InsideView";

// endpoint별로 렌더링

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Bucket_Insideview />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/bucket" element={<MainPage />} />
        <Route path="/main/bucket/:bucketId" element={<MainPage />} />
        <Route path="/main/link" element={<MainPage />} />
        <Route path="/main/texts" element={<MainPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/unshared" element={<UnsharedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
