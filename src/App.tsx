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
import AnimationScreen from "./components/AnimationScreen";
import Chatbot from "./ChatBot";
import AddMenu from "./components/AddMenu";
import RestaurantPage from "./components/RestaurantPage";
import RestaurantList from "./components/RestaurantList";
import Checkout from "./components/Checkout";
import UserOrders from "./components/UserOrders";


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
            <Route path="/restaurant" element={
              token ? (
                <RestaurantPage />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/my-orders" element={
              token ? (
                <UserOrders />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/checkout" element={
              token ? (
                <Checkout />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/restaurant-list" element={
              token ? (
                <RestaurantList />
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
          <Route element={<WithNavbar />}>
            <Route path="/ani" element={
              token ? (
                <AnimationScreen />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/set-menu" element={
              token ? (
                <AddMenu />
              ) : (
                <Navigate to="/" replace />
              )
            } />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="/chat" element={
              token ? (
                <Chatbot />
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
