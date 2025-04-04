import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MintNFT from "./pages/MintNFT";

const App = () => {
  return (
    <Router>
      <h1>Welcome to the Music NFT Platform</h1>
      <Link to="/mint">Mint a New NFT</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<MintNFT />} />
      </Routes>
    </Router>
  );
};

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    title: "",
    artist: "",
    album: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata({ ...metadata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(metadata));

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(`NFT Minted! Token URI: ${data.token_uri}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={metadata.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Artist:</label>
        <input
          type="text"
          name="artist"
          value={metadata.artist}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Album:</label>
        <input
          type="text"
          name="album"
          value={metadata.album}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>File:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default UploadForm;