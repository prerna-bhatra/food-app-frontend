import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/NavBar";
import SignUpForm from "./components/SignUp";
import Login from "./components/Login";
// import Carousel from "./components/carousel";
import Home from "./components/Home";
import WithNavbar from "./components/WithNavbar";
import WithoutNavbar from "./components/WithoutNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<WithNavbar />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/signup" element={<SignUpForm />} />
          </Route>

          <Route element={<WithNavbar />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
