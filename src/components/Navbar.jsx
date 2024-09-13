import React, { useEffect, useState } from "react";
import Logo from "../assets/raplikeren.png";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  useEffect(() => {
    // cek apakah ada token di sessionStorage
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const userData = JSON.parse(storedToken);
      setToken(userData);
    }
  }, []);

  const handleAvatarClick = () => {
    if (token) {
      // Jika sudah login, bisa redirect ke profile atau dashboard
      navigate("/profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <a className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={Logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Belajar Supa
              </span>
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to={"/home"} className={linkClass}>
                  Home
                </NavLink>
                <NavLink to={"/crud"} className={linkClass}>
                  Crud
                </NavLink>
                <NavLink to={"/"} className={linkClass}>
                  Login
                </NavLink>
                <div>
                  <button onClick={handleAvatarClick}>
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={Logo}
                      alt="User Avatar"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
