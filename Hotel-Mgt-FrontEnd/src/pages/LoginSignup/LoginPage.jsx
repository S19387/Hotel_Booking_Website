import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { request } from "../../config/axiosConfig";
import backgroundImage from "../../assets/login/cvimg1.jpg"; // Import your image file
import outerBackground from "../../assets/login/outerBackground.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 2) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await request("POST", "/auth/signin", {
          email,
          password,
        });
        console.log(response);

        if (response.data && response.status === 200) {
          localStorage.setItem("email", response.data.body.email);
          localStorage.setItem("userName", response.data.body.name);
          localStorage.setItem("role", response.data.body.role);
          const role = response.data.body.role;
          if (role == "customer") {
            navigate("/home");
          } else if (role == "manager") {
            navigate("/managers");
          } else if (role == "receptionist") {
            navigate("/bookings");
          } else if (role == "admin") {
            navigate("/admins");
          }
          else if (role == "yogainstructor") {
            navigate("/viewSchedule");
          }
          
          
        } else {
          setErrors({ login: "Invalid email or password" });
        }
      } catch (error) {
        setErrors({ login: "Login failed. Please try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${outerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >


    <div className="p-6 bg-cyan-100 rounded-lg shadow-lg">
      <div className="flex flex-row w-full max-w-4xl bg-white rounded-md">
        {/* Left Column for Image */}
        <div className="relative w-1/2 m-4 ">
          <div className="absolute top-0 left-0 flex items-start justify-center w-full h-full">
            <div className="p-4 mt-3 text-xl font-semibold text-center text-white rounded">
              <p className="text-lg">Join for free and get attractive deals</p>
            </div>
          </div>
          <img
            src={backgroundImage}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Column for Form */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-semibold">
            Already a member? Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Log in
            </button>
            <div className="w-full p-2 mt-2 text-center text-white bg-blue-300 rounded hover:bg-blue-600">
              <Link to="/signup">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
