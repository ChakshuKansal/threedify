import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ModelList from "./components/ModelList";
import ModelViewer from "./components/ModelViewer";

export default function App() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);

  // ✅ Fetch models from backend
  const fetchModels = () => {
    axios.get("http://localhost:5000/models")
      .then((response) => {
        setModels(response.data);
        setSelectedModel(null); // ✅ Reset selection after fetching
      })
      .catch((error) => console.error("Error fetching models:", error));
  };

  // ✅ Fetch models on mount
  useEffect(() => {
    fetchModels();
  }, []);

  // ✅ Log models when state updates (so it logs correctly)
  useEffect(() => {
    console.log("Models updated:", models);
  }, [models]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">3D Model Viewer</h1>

      <UploadForm fetchModels={fetchModels} />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* ✅ Handle empty model list gracefully */}
      {models.length > 0 ? (
        <ModelList models={models} setSelectedModel={setSelectedModel} />
      ) : (
        <p className="text-gray-600 mt-4">No models available. Upload one to get started!</p>
      )}

      {selectedModel && (
        <div className="mt-6 w-full max-w-4xl h-[500px] bg-white shadow-lg rounded-lg">
          <ModelViewer modelUrl={selectedModel} />
        </div>
      )}
    </div>
  );
}
