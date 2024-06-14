import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Location from './Location'; // Import the Location component
import { logout } from '../actions/authActions';
import { pathsThatInludesOnlyProfile } from '../utills/appContstants';
import { searchMenuOrRestaurant } from '../services/restaurentService';
import { capitalizeEachWord } from './commonFunction';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const { token, user } = useSelector((state: any) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<any>();
  const [menus, setMenus] = useState<any>();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavButtonClick = (page: string) => {
    setIsDropdownOpen(false)
    navigate(page);
  };

  const handleSearch = async (searchWord: string) => {
    setIsOpen(false)
    if (searchWord.length > 0) {
      const response: any = await searchMenuOrRestaurant(token, searchWord);
      if (response.status === 200) {
        setRestaurants(response?.data?.restaurants);
        const uniqueMenus = response?.data?.menus.filter((menu: any, index: number, self: any[]) => (
          index === self.findIndex((m: any) => m.dishname === menu.dishname)
        ));

        console.log({ menus: response?.data?.menus, res: response?.data?.restaurants });

        setMenus(uniqueMenus)
      }
    }
    else {
      setRestaurants([])
      setMenus([])
    }
  }

  const [addressPart, setAddressPart] = useState<string>(''); // State to store the address part
  const handleAddressUpdate = (address: string) => {
    setAddressPart(address);
  };

  return (
    <nav className={`md:px-16 border border-gray-300 mb-100 md:mt-0 pb-4 ${pathsThatInludesOnlyProfile.includes(location.pathname) ? 'main-nav-bar shadow' : 'nav-bar pb-[8rem]'}`}>
      <div className="container mx-auto flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4">
          {pathsThatInludesOnlyProfile.includes(location.pathname) ? (
            <button className="text-white font-bold flex items-center space-x-1" onClick={() => navigate("/")}>
              <span>
                <img width={281} src={"/images/logo-black.png"} alt="logo" />
              </span>
            </button>
          ) : (
            <button className="text-white font-bold flex items-center space-x-1" onClick={() => navigate("/")}>
              <span>
                <img width={281} src={"/images/logo.png"} alt="logo" />
              </span>
            </button>
          )}
        </div>

        <div className="hidden md:flex space-x-4">
          {token ? (
            <div className="flex items-center space-x-4">
              <button onClick={() => handleNavButtonClick("my-restaurants")} className={`flex items-center space-x-1 focus:outline-none ${pathsThatInludesOnlyProfile.includes(location.pathname) ? 'text-black' : 'text-white'}`}>
                My restaurants
              </button>
              <button onClick={() => handleNavButtonClick("partner-with-us")} className={`flex items-center space-x-1 focus:outline-none ${pathsThatInludesOnlyProfile.includes(location.pathname) ? 'text-black' : 'text-white'}`}>
                Register restaurant
              </button>
              <button className={`flex items-center space-x-1 focus:outline-none ${pathsThatInludesOnlyProfile.includes(location.pathname) ? "text-black" : "text-white"}`}>
                <span>Offers</span>
              </button>
              <button className={`flex items-center space-x-1 focus:outline-none ${pathsThatInludesOnlyProfile.includes(location.pathname) ? "text-black" : "text-white"}`}>
                <span>Cart</span>
              </button>
              <button
                onClick={toggleDropdown}
                className="relative flex items-center justify-center bg-transparent text-gray-800 px-4 py-2 focus:outline-none"
              >
                <span className={`font-bold rounded-full p-2 h-[48px] w-[48px] flex items-center justify-center bg-[#FF6D03] text-white`}>
                  {user.name.split(" ")[0].charAt(0).toUpperCase()}
                  {user.name.split(" ")[user.name.split(" ").length - 1].charAt(0).toUpperCase()}
                </span>
                <img src={` ${pathsThatInludesOnlyProfile.includes(location.pathname) ? "/images/dropdown.png" : "/images/white-dropdown.png"}`} alt="Icon" className="w-6 h-6 ml-2" />
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
                        <button onClick={() => {
                          navigate("/my-orders");
                        }} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">Orders</button>
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
              <Link to="/login" className="text-[#FFFFFF] text-[16px]">Login</Link>
              <Link to="/signup" className="text-white font-bold">
                <img className="h-15" src={"/images/signup.png"} alt="Sign Up" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`focus:outline-none ${pathsThatInludesOnlyProfile.includes(location.pathname) ? "text-black" : "text-white"}`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isDropdownOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4 bg-gray-800 text-white">
          {token ? (
            <>
              <button onClick={() => handleNavButtonClick("my-restaurants")} className="focus:outline-none">My restaurants</button>
              <button onClick={() => handleNavButtonClick("partner-with-us")} className="focus:outline-none">Register restaurant</button>
              <button className="focus:outline-none">Offers</button>
              <button className="focus:outline-none">Cart</button>
              <button onClick={() => navigate("/profile")} className="focus:outline-none">Profile</button>
              <button onClick={handleLogout} className="focus:outline-none">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="focus:outline-none">Login</Link>
              <Link to="/signup" className="focus:outline-none">Sign Up</Link>
            </>
          )}
        </div>
      )}

      {!pathsThatInludesOnlyProfile.includes(location.pathname) && (
        <>
          <div className="mt-32 md:pl-20 px-4">
            <h1 className="text-white text-[32px] md:text-3xl mb-10 font-bold">Discover the Delicious Difference</h1>
            <div className="md:flex md:items-center">
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="Search your favorite food - (cake, paratha, pastry, pizza etc)"
                className="border border-gray-300 px-[32px] py-4 rounded-[40px] focus:outline-none mt-5 md:mt-0 w-full md:w-auto md:flex-grow h-[54px] text-[16px] text-[#1F1F1F]"
              />

              {token && (
                <div className="relative mt-5 md:mt-0">
                  <button
                    className="bg-blue-500 border border-gray-300 bg-white px-4 py-2 rounded-[40px] focus:outline-none w-full md:w-[201px] h-[54px] flex items-center justify-around lg:ml-[8px]"
                    onClick={() => {
                      setRestaurants([]);
                      setMenus([]);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <img src="/images/loclogo.png" alt="Location" className="h-6 w-6" />
                      <p className="text-sm text-[#888888]">
                        {addressPart ? addressPart : "Mumbai"}
                      </p>
                    </div>
                    <div>
                      <img src="/images/dropdown.png" alt="Dropdown" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded-[32px] z-10">
                      <Location onAddressUpdate={handleAddressUpdate} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {(menus && menus.length) || (restaurants && restaurants.length) ? (
            <div className="max-h-80 w-full md:w-[874px] mx-4 md:mx-20 rounded-[24px] overflow-hidden z-50 relative bg-white p-4 mt-4">
              <div className="h-full overflow-y-auto">
                {menus && menus.length > 0 && (
                  <div className="z-10 bg-white p-1 relative">
                    <ul className="divide-y">
                      {menus.map((menu: any) => (
                        <li key={menu.id} className="p-2 block hover:bg-gray-200 cursor-pointer">
                          <div
                            onClick={() => {
                              setRestaurants([]);
                              setMenus([]);
                              navigate("/restaurant-list", {
                                state: { dishname: menu.dishname }
                              });
                            }}
                          >
                            <h4 className="text-sm font-semibold text-left mb-1">{capitalizeEachWord(menu.dishname)} - Delivery</h4>
                            <p className="text-left text-xs text-gray-500 font-medium">Dish</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {restaurants && restaurants.length > 0 && (
                  <div className="z-10 bg-white relative">
                    <ul className="divide-y">
                      {restaurants.map((restaurant: any) => (
                        <li key={restaurant.id} className="p-2">
                          <div
                            onClick={() => {
                              setRestaurants([]);
                              setMenus([]);
                              navigate("/restaurant", {
                                state: {
                                  resId: restaurant.id
                                }
                              });
                            }}
                            className="block hover:bg-gray-50 cursor-pointer"
                          >
                            <h4 className="text-sm font-semibold text-left mb-1">{capitalizeEachWord(restaurant.name)}</h4>
                            <p className="text-xs text-left">{capitalizeEachWord(restaurant.completeAddress)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </nav>
  );
};

export default Navbar;
