import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  async function deleteUser(userId) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    fetchUsers();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  const navigate = useNavigate();

  const navEdit = (userId) => {
    navigate(`/crud/${userId}`);
  };

  return (
    <div className="px-10 py-10">
      <div className="overflow-x-auto ">
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
                  {user.id}
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
                      deleteUser(user.id);
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
