import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../createClient";
import { useNavigate, useParams } from "react-router-dom";

const CrudPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("id, name, age")
          .eq("id", id)
          .single();

        if (error) {
          setError("Failed to fetch user data");
          console.error(error);
        } else {
          setUser(data);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // update User
      const { error } = await supabase
        .from("users")
        .update({ name: user.name, age: user.age })
        .eq("id", id);

      if (error) {
        setError("Failed to update user");
        console.error(error);
      } else {
        navigate("/");
      }
    } else {
      // Create User
      const { error } = await supabase
        .from("users")
        .insert({ name: user.name, age: user.age });

      if (error) {
        setError("Failed to create user");
        console.error(error);
      } else {
        navigate("/");
      }
    }
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {erorr}</p>;

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Form {id ? "Edit" : "Create"} user
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block text-gray-700 font-medium mb-2"
              >
                Nama:{" "}
              </label>
              <input
                type="text"
                value={user.name}
                name="name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block text-gray-700 font-medium mb-2"
              >
                Age:{" "}
              </label>
              <input
                type="text"
                value={user.age}
                name="age"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrudPage;
