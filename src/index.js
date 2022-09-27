import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Page from "./Page";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
// import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          {/* <Route path="/lessons" element={<Lessons />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/singup" element={<SingUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);