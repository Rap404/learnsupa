import React, { useState } from "react";
import { supabase } from "../createClient";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    // pastikan searchTerm tidak kosong
    if (searchTerm.trim() === "") {
      setError("Please enter a search term");
      return;
    }

    try {
      setError(null);
      // Query ke supabase untuk mencari data berdasarkan searchTerm
      const { data, error } = await supabase
        .from("users")
        .select("id, name, age, avatar_url")
        .ilike("name", `%${searchTerm}%`);

      if (error) {
        setError("Error fetching data");
        console.error(error);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("Search error:", error.message);
      setError("An error occurred while searching");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl mb-4">Search User</h1>

      <form action="" onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Searchh..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 rounded"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 ? (
        <ul className="list-disc ml-5">
          {results.map((user) => (
            <li key={user.id}>
              <div className="p-2 border-b">
                <p>Name: {user.name}</p>
                <p>Name: {user.age}</p>
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No result found</p>
      )}
    </div>
  );
};

export default SearchBar;
