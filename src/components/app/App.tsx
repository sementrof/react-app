import DirectionPage from "../pages/direction-page/direction-page";
import MainComponent from "../header/navbar/Header";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/admin-page/login-page/Login-page"; // путь к вашему компоненту
import AdminPanel from "../pages/admin-page/MainAdmin-page/Admin-page";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<MainComponent />} />
        <Route path="/directions/:direction" element={<DirectionPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
