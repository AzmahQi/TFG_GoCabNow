'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
//import { useToast } from "@/components/ui/use-toast"

import React, { useState } from 'react';

export default function LoginForm  () {
  //const { toast } = useToast()
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic validation: Check if fields are not empty
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      // Email format validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Perform your login logic here using formData.email and formData.password
      const signInData = await signIn('credentials',{redirect: false, email: formData.email, password: formData.password})
      console.log(signInData);

      if (!signInData?.error){
        console.log(signInData.error)
      }else {
        router.refresh();
        router.push('/dashboard')
      }
      console.log('Login form submitted with:', formData);
      // Reset form after submission

    }else{
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      })
    }
  };

  return (
    
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl text-black font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email ? 'border-red-500' : 'focus:border-blue-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.password ? 'border-red-500' : 'focus:border-blue-500'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="flex justify-between items-center">
            <button

              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
              disabled={isLoading}
            >
                {isLoading ? <span>Loading...</span>:<span>Login</span>}
            </button>
            <span className="text-sm text-gray-600">
              Don&apos;t have an account? <a href="/register">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

