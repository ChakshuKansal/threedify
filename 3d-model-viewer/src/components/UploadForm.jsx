import axios from "axios";
import { useState } from "react";

export default function UploadForm({ fetchModels }) { // ✅ Ensure fetchModels is received as a prop
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || !url) return alert("Name and URL are required!");

    try {
      await axios.post("http://localhost:5000/upload", { name, description, url });
      fetchModels(); // ✅ This will now refresh the list properly
      setName("");
      setDescription("");
      setUrl("");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4 bg-gray-100 rounded-lg">
      <input type="text" placeholder="Model Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <input type="text" placeholder="Model URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Upload Model
      </button>
    </form>
  );
}
