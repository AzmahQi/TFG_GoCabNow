"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm({ data }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic validation: Check if fields are not empty
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    toast.dismiss();
    setIsLoading(true);
    e.preventDefault();

    if (validateForm()) {
      // Perform your login logic here using formData.email and formData.password
      const signInData = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInData.ok) {
        toast.success(data.valSuccess, {
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
        router.push("/dashboard");
      } else if (signInData?.error) {
        toast.error(data.valInvalid, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.valError, {
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
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen pb-5">
        <div className="bg-white p-8 shadow-md rounded-md w-96">
          <h2 className="text-2xl text-black font-semibold mb-4">
            {data.title}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium"
              >
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
            <div className="flex justify-center items-center">
              <button
              type="submit"
                className={`${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                } bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 `}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>{data.buttonLoadingText}</span>
                ) : (
                  <span>{data.buttonText}</span>
                )}
              </button>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                {data.questionToSignUp} <a className="underline" href="/register">{data.toSingUp}</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
