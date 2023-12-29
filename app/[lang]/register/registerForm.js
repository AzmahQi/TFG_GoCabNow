"use client";
import { createUser } from "@/lib/db";
// components/Register.js
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";



const RegisterForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: '2000-01-01', // Set a default date or handle empty date appropriately
  });

  const [errors, setErrors] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic validation: Check if fields are not empty
    if (!formData.name.trim()) {
      newErrors.name = data.nameRequired;
      isValid = false;
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = data.cnRequired;
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = data.emailRequired;
      isValid = false;
    } else {
      // Email format validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = data.invalidFormat;
        isValid = false;
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = data.passwordRequired;
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = data.confirmPassMatch;
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    }
  
    // Validate birthDate
  if (!formData.birthDate || isNaN(new Date(formData.birthDate))) {
    newErrors.birthDate = 'Please enter a valid birthDate';
    isValid = false;
  }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await createUser(formData);
        console.log(response);
        if (response.user) {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.refresh();
          router.push("/login");
        } else {
          toast.error(response.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.log("Error during user creation:", error);
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen pb-5">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl text-black font-semibold mb-4">{data.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium">
              {data.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.name ? "border-red-500" : "focus:border-blue-500"
              }`}
              placeholder={data.namePlaceHolder}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthdate"
              className="block text-gray-600 font-medium"
            >
              Birthdate
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.birthDate ? "border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-black">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-black">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-black">Other</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-gray-600 font-medium"
            >
              {data.contactNumber}
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.contactNumber
                  ? "border-red-500"
                  : "focus:border-blue-500"
              }`}
              placeholder={data.cnPlaceHolder}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              {data.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "focus:border-blue-500"
              }`}
              placeholder={data.emailPlaceHolder}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              {data.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "focus:border-blue-500"
              }`}
              placeholder={data.passwordPlaceHolder}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-medium"
            >
              {data.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "focus:border-blue-500"
              }`}
              placeholder={data.confirmPassPlaceHolder}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 `}
              disabled={isLoading}
            >
              {isLoading ? data.buttonLoadingText : data.buttonText}
            </button>
          </div>
          <div>
          <span className="text-sm text-gray-600 ">
              {data.questionToSignIn} <a className="underline" href="/login">{data.toSingIn} </a>
            </span>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
