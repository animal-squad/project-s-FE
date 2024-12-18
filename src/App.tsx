import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import UnsharedPage from "./Pages/UnsharedPage";
import { ImagesSliderDemo } from "./Pages/LandingPage";
import PrivacyPolicy from "./Pages/PrivacyPolicyPage";
import Bucket_view from "./Pages/Bucket_ViewPage";
import Bucket_InsideView from "./Pages/Bucket_InsidePage";
import Link_ViewPage from "./Pages/Link_ViewPage";
import Link_Search from "./Pages/Link_SearchPage";
// endpoint별로 렌더링

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<ImagesSliderDemo />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bucket" element={<Bucket_view />} />
        <Route path="/bucket/:bucketId" element={<Bucket_InsideView />} />
        <Route path="/links" element={<Link_ViewPage />} />
        <Route path="/search" element={<Link_Search />} />
        {/* <Route path="/main/bucket" element={<MainPage />} />
        <Route path="/main/bucket/:bucketId" element={<MainPage />} />
        <Route path="/main/link" element={<MainPage />} />
        <Route path="/main/texts" element={<MainPage />} /> */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/unshared" element={<UnsharedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
