import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { login } from '../services/authService';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response: any = await login(data);

      console.log({response});
      
      setLoading(false)
      if (response.status === 200) {

        dispatch(loginSuccess({
          token: response.data.token,
          user: response.data.user
        }));
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <ToastContainer />

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-5 sm:px-6 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Log In</h2>
              <p className='text-sm mt-2 text-[#888888]'>Please sign in to you account below</p>
            </div>

            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close" onClick={() => navigate("/")}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='px-6'>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-1 text-[#888888]">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500">Email is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-1 text-[#888888]">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            <div className="mb-4 flex justify-between">
              <div>
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={handleCheckboxChange}
                  className="mr-2 "
                />
                <label htmlFor="show-password" className="text-sm text-[#888888]">Show Password</label>
              </div>
              <Link to="/forgot-password" className="text-sm hover:underline text-[#888888] ">
                Fortgot password ? 
              </Link>
            </div>
            <button
              type="submit"
              className="mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-full"
            >
              {loading && (
                <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
              )}
              {!loading ? (
                'Log In'
              ) : (
                <span className="opacity-0">Sign Up</span> // Hide the text when loading
              )}
            </button>
          </form>
          <p className="mt-4 text-center mb-4">
            Not having an account  ?
            <Link to="/signup" className="text-[#FF6D03] hover:underline ml-3">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
