import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const HomePage = ({ token }) => {
  const [projects, setProjets] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await supabase.from("Projects").select("*");
    setProjets(data);
  }

  async function deleteUser(projectId, avatar) {
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
      .from("Projects")
      .delete()
      .eq("id", projectId);
    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      setError("Gagal menghapus pengguna");
    } else {
      console.log("User deleted succesfully!");
      navigate("/home");
    }
  }

  const navigate = useNavigate();

  const navEdit = (projectId) => {
    navigate(`/crud/${projectId}`);
  };

  return (
    <div className="px-10 py-10">
      <div className="flex">
        <div className="">
          <h2>Welcome, {token.user.user_metadata.full_name}</h2>
          <h2>Welcome, {token.user.user_metadata.role}</h2>
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
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.name}'s avatar`}
                      width={100}
                    />
                  ) : (
                    <p>No avatar availble</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {project.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-black">
                  <button
                    className="px-4 mx-3 bg-red-400"
                    onClick={() => {
                      deleteUser(project.id, project.image);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 mx-3 bg-blue-400"
                    onClick={() => navEdit(project.id)}
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
