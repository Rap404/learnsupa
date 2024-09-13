import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../createClient";
import { useNavigate, useParams } from "react-router-dom";

const CrudPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    name: "",
    image: "",
    description: "",
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
          .from("Projects")
          .select("id, name, image, description")
          .eq("id", id)
          .single();

        if (error) {
          setError("Failed to fetch user data");
          console.error(error);
        } else {
          setProjects(data);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjects((prevProjects) => ({
      ...prevProjects,
      [name]: value,
    }));
  };

  console.log(projects);
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
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const newFileName = `avatar_${timestamp}.${fileExtension}`;

      // Upload file ke supabase

      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`public/${newFileName}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Mendapatkan Url dari file yang di unggah

      const { data: urlData, error: urlError } = supabase.storage
        .from("avatars")
        .getPublicUrl(`public/${newFileName}`);

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
    let imageUrl = projects.image;

    if (file) {
      imageUrl = await uploadImage();

      if (!imageUrl) {
        console.log(projects);
        console.log(imageUrl);
        setError("Failed to upload image");
        return;
      }
    }

    if (id) {
      // Update Projects
      const { error } = await supabase
        .from("Projects")
        .update({
          name: projects.name,
          image: imageUrl,
          description: projects.description,
        })
        .eq("id", id);
      if (error) {
        setError("Gagal memperbarui data");
        console.error(error);
      } else {
        console.log(projects);
        navigate("/home");
      }
    } else {
      // Create User
      const { error } = await supabase.from("Projects").insert({
        name: projects.name,
        image: imageUrl,
        description: projects.description,
      });

      if (error) {
        setError("Gagal menambahkan data");
        console.error(error);
      } else {
        console.log(projects);
        navigate("/home");
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
            Form {id ? "Edit" : "Create"} Project
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name:{" "}
              </label>
              <input
                type="text"
                value={projects.name}
                name="name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description:{" "}
              </label>
              <input
                type="text"
                value={projects.description}
                name="description"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Image:
              </label>
              <input type="file" onChange={handleFileChange} name="image" />
              {projects.image && (
                <div className="">
                  <p>Current Avatar</p>
                  <img src={projects.image} alt="image" />
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
