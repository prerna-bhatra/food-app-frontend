import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { signup } from '../services/authService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const response: any = await signup(data);
      setLoading(false)
      if (response.status === 200) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      setLoading(false)
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-5 sm:px-6 flex justify-between">
            <h2 className="text-2xl font-bold">Signup</h2>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close" onClick={() => navigate("/")}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='px-6'>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500">Please enter a valid email address</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.phone && <p className="text-red-500">Please enter a valid 10-digit phone number</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.password && <p className="text-red-500">Password must be at least 6 characters long</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue relative"
            >
              {loading && (
                <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
              )}
              {!loading ? (
                'Sign Up'
              ) : (
                <span className="opacity-0">Sign Up</span> // Hide the text when loading
              )}
            </button>
            <p className="mt-4 text-center mb-4">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
