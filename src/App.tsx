import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import RegisterRestaurantForm from "./components/RegisterRestaurantForm";
import MyRestaurent from "./components/MyRestaurent";
import RestaurantDocumentForm from "./components/RestaurantDocumentForm";
import MyExistingRestaurant from "./components/MyExistingRestaurant";


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
            <Route path="/profile" element={
              token ? (
                <Profile />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/partner-with-us" element={
              token ? (
                <RegisterRestaurantForm />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/partner-with-us-documents" element={
              token ? (
                <RestaurantDocumentForm />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/my-restaurants" element={
              token ? (
                <MyExistingRestaurant />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/existing-restuarents" element={
              token ? (
                <MyRestaurent />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
