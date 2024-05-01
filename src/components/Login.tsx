import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate()

  //hooks
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  console.log("formData", formData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("targetname", e.target.name, "targetvalue", e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: any = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful signup
        console.log('User login successfully!', response);
        const responsePayload = await response.json()
        console.log({ responsePayload, tk: responsePayload.token });

        dispacth(loginSuccess({
          token: responsePayload.data.token,
          user: responsePayload.data.user
        }))
        navigate("/")
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error('Error during signup:', await response.json());
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-5 sm:px-6 flex justify-between">
            <h2 className="text-2xl font-bold">Login</h2>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close" onClick={() => {
              navigate("/")
            }}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className='px-6'>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue" onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center mb-4">
            Not having an account?
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;