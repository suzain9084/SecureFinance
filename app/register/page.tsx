"use client"

import React from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <span className="inline-block p-4 border rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.5 0 4.5 2.5 4.5 5H7.5c0-2.5 2-5 4.5-5zm0-6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" />
            </svg>
          </span>
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-gray-500">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="text-red-500 text-sm">Full Name is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:underline">
                Log In
              </a>
            </p>
          </div>

          <p className="text-center text-gray-400 text-sm mt-4">
            By registering, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
}
