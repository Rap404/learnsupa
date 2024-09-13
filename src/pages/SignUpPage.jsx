import React, { useState } from "react";
import { supabase } from "../createClient";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullname,
            role: formData.role,
          },
        },
      });
      console.log(data);
      if (error) throw error;
      alert("check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Form Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-2"
          >
            Fullname:{" "}
          </label>
          <input
            placeholder="Fullname"
            name="fullname"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Select role:{" "}
          </label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full my-2 bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            submit
          </button>
        </form>
        Already have an account?<Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
