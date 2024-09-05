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
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from("users")
          .select("id, name, age, avatar_url")
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      setError("kesalahan tipe file, tolong masukan file gambar saja");
    }
  };

  const uploadImage = async () => {
    if (!file) {
      setError("Tolong Masukan file untuk di upload");
      return;
    }

    try {
      // Upload file ke supabase

      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Mendapatkan Url dari file yang di unggah

      const { data: urlData, error: urlError } = supabase.storage
        .from("avatars")
        .getPublicUrl(`public/${file.name}`);

      if (urlError) {
        throw urlError;
      }

      return urlData.publicUrl;
      // setPublicUrl(urlData.publicUrl);
    } catch (error) {
      console.error("error mengupload error:", error.message);
      setError("Error uploading file: " + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Periksa file ada file yang dipilih
    let imageUrl = user.avatar_url;

    if (file) {
      imageUrl = await uploadImage();

      if (!imageUrl) {
        console.log(user);
        console.log(imageUrl);
        setError("Failed to upload image");
        return;
      }

      if (id) {
        // Update User
        console.log(imageUrl);
        const { error } = await supabase
          .from("users")
          .update({ name: user.name, age: user.age, avatar_url: imageUrl })
          .eq("id", id);
        if (error) {
          setError("Gagal memperbarui data");
          console.error(error);
        } else {
          console.log(user);
          navigate("/");
        }
      } else {
        // Create User
        const { error } = await supabase
          .from("users")
          .insert({ name: user.name, age: user.age, avatar_url: imageUrl });

        if (error) {
          setError("Gagal menambahkan data");
          console.error(error);
        } else {
          console.log(user);
          navigate("/");
        }
      }
    }
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

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
                htmlFor="name"
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
                htmlFor="age"
                className="block text-gray-700 font-medium mb-2"
              >
                Age:{" "}
              </label>
              <input
                type="number"
                value={user.age}
                name="age"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-gray-700 font-medium mb-2"
              >
                Avatar:
              </label>
              <input type="file" onChange={handleFileChange} name="avatar" />
              {user.avatar_url && (
                <div className="">
                  <p>Current Avatar</p>
                  <img src={user.avatar_url} alt="Avatar" />
                </div>
              )}
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
