import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Location from './Location'; // Import the Location component
import { logout } from '../actions/authActions';
import { pathsThatInludesOnlyProfile } from '../utills/appContstants';
import { searchMenuOrRestaurant } from '../services/restaurentService';

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
    <nav className={` md:pr-40 pr-2 md:pl-40 border border-gray-300 mb-100 md:mt-0 ${pathsThatInludesOnlyProfile.includes(location.pathname) ? 'main-nav-bar' : 'nav-bar  pb-[8rem]'}`}>
      <div className="container mx-auto flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4">
          <button className="text-white font-bold flex items-center space-x-1" onClick={() => navigate("/")}>
            <span>
              <img width={281} src={"/images/logo.png"} alt="logo" />
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
                className="relative flex items-center justify-center bg-transparent text-gray-800  px-4 py-2 focus:outline-none"
              >
                <span className='text-white font-bold bg-[#FF6D03] rounded-[100%] p-2'>
                  {user.name.split(" ")[0].charAt(0).toUpperCase()}
                  {user.name.split(" ")[user.name.split(" ").length - 1].charAt(0).toUpperCase()}
                </span>
                <img src="/images/white-dropdown.png" alt="Icon" className="w-6 h-6 ml-2" />
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
              <Link to="/login" className="text-white font-bold">Login</Link>
              <Link to="/signup" className="text-white font-bold">Signup</Link>
            </div>
          )}
        </div>
      </div>
      {
        !pathsThatInludesOnlyProfile.includes(location.pathname) ? (
          <>
            <div className="mt-40 md:pl-20 px-4">
              <h1 className="text-white text-2xl md:text-3xl mb-10">Discover the Delicious Difference</h1>
              <div className="md:flex md:items-center">
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  placeholder="Search your favorite food"
                  className="border border-gray-300 px-4 py-2 rounded-[40px] focus:outline-none mt-5 md:mt-0 w-full md:w-auto md:flex-grow h-[54px]"
                />
                {token && (
                  <div className="relative mt-5 md:mt-0 md:ml-2 w-full md:w-auto">
                    <button
                      className="border border-gray-300 bg-white px-4 py-2 rounded-[40px] focus:outline-none w-full md:w-[201px] h-[54px] flex items-center justify-between"
                      onClick={() => {
                        setRestaurants([]);
                        setMenus([]);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <img src="/images/loclogo.png" alt="Location" />
                      {addressPart}
                      <img src="/images/dropdown.png" alt="Dropdown" />
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

            <div className='md:pl-20 md:pr-[200px] z-50 relative '>
              {menus && menus.length > 0 && (
                <div className=" z-10  w-full mt-2 bg-white  shadow-md  p-1">
                  <ul className="divide-y divide-gray-800">
                    {menus.map((menu: any) => (
                      <li key={menu.id} className="p-2 ">
                        <div onClick={() => {
                          setRestaurants([])
                          setMenus([])
                          navigate("/restaurant-list", {
                            state: { dishname: menu.dishname }
                          })
                        }} className="block hover:bg-gray-50 cursor-pointer">
                          <h4 className="text-xl font-semibold">{menu.dishname}</h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {restaurants && restaurants.length > 0 && (
                <div className=" z-10  bg-white  shadow-md ">
                  <ul className="divide-y divide-gray-800">
                    {restaurants.map((restaurant: any) => (
                      <li key={restaurant.id} className="p-2">
                        <div onClick={() => {
                          setRestaurants([])
                          setMenus([])
                          navigate("/restaurant", {
                            state: {
                              resId: restaurant.id
                            }
                          })
                        }} className="block hover:bg-gray-50 cursor-pointer">
                          <h4 className="text-xl font-semibold">{restaurant.name}</h4>
                          <p>{restaurant.completeAddress}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
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
