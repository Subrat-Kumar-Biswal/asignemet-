import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
// import clientId from "../config/clientId";
// import jwt_decode from 'jwt-decode';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle Google OAuth success


  const handleGoogleSuccess = async (credentialResponse) => {

    console.log(credentialResponse)
    try {
      const decoded = jwt_decode(credentialResponse.credential);

      // Prepare user data from Google response
      const userData = {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        avatar: decoded.picture,
        isGoogleAuth: true,
        clientId,
      };

      setIsLoading(true);
      setApiError("");

      // Send to your backend for verification/registration
      const response = await axios.post("/api/auth/google", { ...userData, clientId });

      // Store token and redirect
      localStorage.setItem("token", response.data.token);
      setSuccessMessage("Google registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Google authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth failure
  const handleGoogleFailure = () => {
   console.log("login failed")
    setApiError("Google login failed. Please try again.");
  };

  // ... [keep all the existing handleChange, validateForm, handleSubmit methods] ...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/register", formData) // Fixed the typo in the URL
      .then((response) => {
        console.log(response);
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        setApiError(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Google Sign Up Button */}
      <div className="mb-6">
        <div className="flex justify-center">
          <GoogleLogin
            clientId={"833589828607-bmqq1od0ct7vjubq1r44tvtloqogalcd.apps.googleusercontent.com"}
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            text="signup_with"
            shape="rectangular"
            size="large"
            width="350"
          />
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* Regular Email Sign Up Form */}
      <form>
        {/* ... [keep all the existing form fields] ... */}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="conformPassword"
            value={formData.conformPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {/* {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )} */}
        </div>

        {/* ... [other form fields] ... */}

        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Registering..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
