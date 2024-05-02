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
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";
import { useSelector } from "react-redux";


function App() {
  const { token, user } = useSelector((state: any) => state.auth);

  return (
    <div className="App">
      <Router>
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
          <Route element={<WithNavbar />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
