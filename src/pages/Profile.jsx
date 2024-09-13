import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const Profile = ({ token }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src={Logo}
            alt=""
          />
        </div>
        <div className="mt-4 text-center">
          you are {token.user.user_metadata.role}
          <h2 className="text-2xl font-bold">
            {token.user.user_metadata.full_name}
          </h2>
          <p className="text-gray-600">{token.user.user_metadata.email}</p>
          <p className="text-gray-600"></p>
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              sessionStorage.removeItem("token"); // Logout dengan menghapus token
              navigate("/signin"); // Redirect ke halaman login
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
