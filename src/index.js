import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import React from 'react';

import CourseOne from "./pages/CourseOne";
import LessonOne from "./pages/LessonOne";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import About from "./pages/About";
import Page from "./Page";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseOne />} />
          <Route path="/lessons/:id" element={<LessonOne />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);