import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Location from './Location'; // Import the Location component
import { logout } from '../actions/authActions';
import { pathsThatInludesOnlyProfile } from '../utills/appContstants';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const { token, user } = useSelector((state: any) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavButtonClick = (page: string) => {
    navigate(page);
  };

  return (
    <nav className={`md:pr-40 pr-2 md:pl-40 border border-gray-300 mt-5 md:mt-0 ${pathsThatInludesOnlyProfile.includes(location.pathname) ? 'main-nav-bar' : 'nav-bar  pb-[8rem]'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="text-white font-bold flex items-center space-x-1" onClick={() => navigate("/")}>
            <span>
              <img width={60} src={"https://static.vecteezy.com/system/resources/previews/014/300/816/original/motorbike-for-food-delivery-service-online-ordering-concept-png.png"} alt="logo" />
            </span>
          </button>

        </div>

        <div className="md:block space-x-4">
          {token ? (
            <div className="flex items-center space-x-4">
              <button onClick={() => handleNavButtonClick("my-restaurants")} className="flex items-center space-x-1 focus:outline-none text-white hidden md:block">
                My restaurants
              </button>
              <button onClick={() => handleNavButtonClick("partner-with-us")} className="flex items-center space-x-1 focus:outline-none text-white hidden md:block">
                Register restaurant
              </button>
              <button className="flex items-center space-x-1 focus:outline-none text-white hidden md:block">
                <span>Offers</span>
              </button>
              <button className="flex items-center space-x-1 focus:outline-none text-white hidden md:block">
                <span>Cart</span>
              </button>
              <button
                onClick={toggleDropdown}
                className="relative flex items-center space-x-1 focus:outline-none text-white"
              >
                <span>{user.name}</span>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg">
                    <ul>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/profile");
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Profile</button>
                      </li>
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Notifications</button>
                      </li>
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Wallet</button>
                      </li>
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Orders</button>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white font-bold">Login</Link>
              <Link to="/signup" className="text-white font-bold">Signup</Link>
            </div>
          )}
        </div>
      </div>
      {
        !pathsThatInludesOnlyProfile.includes(location.pathname) ? (
          <div className="flex justify-center mt-20">
            <div className="md:flex md:items-center ">
              {token && (
                <div className="relative">
                  <button className="text-white font-bold flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                    <span>Current Location:</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 bg-white shadow mt-2 md:mt-5">
                      <Location />
                    </div>
                  )}
                </div>
              )}
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 px-4 py-2 rounded focus:outline-none mt-5 md:mt-0 md:w-full lg:w-full sm:w-full"
              />
            </div>
          </div>
        ) : null
      }


      {isDropdownOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2">
            <button onClick={() => handleNavButtonClick("partner-with-us")} className="flex items-center space-x-1 focus:outline-none text-white">
              Register restaurant
            </button>
            <button className="flex items-center space-x-1 focus:outline-none text-white">
              <span>Offers</span>
            </button>
            <button className="flex items-center space-x-1 focus:outline-none text-white">
              <span>Cart</span>
            </button>
            <button onClick={() => navigate("/profile")} className="flex items-center space-x-1 focus:outline-none text-white">
              <span>Profile</span>
            </button>
            <button onClick={handleLogout} className="flex items-center space-x-1 focus:outline-none text-white">
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
