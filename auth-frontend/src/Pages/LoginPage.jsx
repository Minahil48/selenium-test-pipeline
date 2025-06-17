import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const toggleMode = () => setIsSignup(!isSignup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login";
    const payload = isSignup ? { email, password, role } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Store token in localStorage (only for login)
      if (!isSignup && data.token) {
        localStorage.setItem("token", data.token);

        // Redirect based on user role
        if (data.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }

      alert(`${isSignup ? "Signed up" : "Logged in"} as ${isSignup ? role : data.user?.role}`);
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back!"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />
          {isSignup && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={toggleMode}
            className="text-blue-500 ml-1 underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
