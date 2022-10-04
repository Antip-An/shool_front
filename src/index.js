import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Page from "./Page";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseOne from "./pages/CourseOne";
// import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Privacy from "./pages/Privacy";
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseOne />} />
          {/* <Route path="/lessons" element={<Lessons />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);