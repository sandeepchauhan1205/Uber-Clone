import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Start from "./pages/Start";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
      <Route path="/captain/signup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
