import React, { useState } from "react";
import { supabase } from "../createClient";

const ImageUpload = () => {
  // state untuk menyimpan file gambar
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // fungsi untuk menangani perubahan pada file input
  const handelImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("Please select an image to upload");
      return;
    }

    const fileName = `${Date.now()}-${selectedImage.name}`;
    const { data, error } = await supabase.storage
      .from(`avatars`)
      .upload(`public/${fileName}`, selectedImage);

    if (error) {
      console.error("Error uploading image: ", error.message);
      setUploadStatus("Failed to upload image");
    } else {
      console.log("Image uploaded succesfully: ", data);
      setUploadStatus("Image uploaded succesfully!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput">Choose an image: </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handelImageChange}
        />

        {/* menampilkan preview gambar */}
        {previewUrl && (
          <div>
            <h4>Image Preview</h4>
            <img
              src={previewUrl}
              alt="Selected Preview"
              className="w-80 h-auto"
            />
          </div>
        )}

        <button type="subnit">Upload Image</button>
      </form>

      {/* status upload */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUpload;
