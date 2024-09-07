import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const HomePage = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  async function deleteUser(userId, avatar) {
    if (avatar) {
      // Ekstrak nama file dari URL avatar
      const fileName = avatar.split("/").pop();
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([`public/${fileName}`]);
      if (deleteError) {
        console.error("Error deleting file:", deleteError);
        setError("Gagal menghapus file avatar");
        return;
      }
      console.log("Avatar deleted successfully!");
    }
    // Hapus data pengguna dari table
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      setError("Gagal menghapus pengguna");
    } else {
      console.log("User deleted succesfully!");
      navigate("/home");
    }
  }

  const navigate = useNavigate();

  const navEdit = (userId) => {
    navigate(`/crud/${userId}`);
  };

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="px-10 py-10">
      <div className="flex">
        <div className="">
          <h2>Welcome, {token.user.user_metadata.full_name}</h2>
          <button className="px-4 mx-3 bg-red-400 mt-1" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <SearchBar />
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-slate-500">
          <thead className="bg-gray-50">
            <tr className=" border border-black bg-slate-500">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={`${user.name}'s avatar`}
                      width={100}
                    />
                  ) : (
                    <p>No avatar availble</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  <button
                    className="px-4 mx-3 bg-red-400"
                    onClick={() => {
                      deleteUser(user.id, user.avatar_url);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 mx-3 bg-blue-400"
                    onClick={() => navEdit(user.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
