import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

const LoginPage = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  console.log(formData);
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      console.log(data);
      setToken(data);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Form Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:{" "}
          </label>
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:{" "}
          </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full my-2 bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            submit
          </button>
        </form>
        Don't have an account?<Link to="/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default LoginPage;
