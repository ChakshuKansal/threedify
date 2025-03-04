import { useEffect, useState, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model({ url }) {
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    async function fetchModel() {
      if (!url) return;
      try {
        let modifiedUrl = url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "?dl=1");
        const response = await fetch(modifiedUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setModelData(objectUrl);
      } catch (error) {
        console.error("Failed to fetch model:", error);
      }
    }

    fetchModel();
    return () => {
      if (modelData) URL.revokeObjectURL(modelData);
    };
  }, [url]);

  const gltf = useMemo(() => (modelData ? useLoader(GLTFLoader, modelData) : null), [modelData]);

  return gltf ? <primitive object={gltf.scene} scale={2} /> : <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="gray" /></mesh>;
}

export default function ModelViewer({ modelUrl }) {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Model url={modelUrl} />
      <OrbitControls />
    </Canvas>
  );
}