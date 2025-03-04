export default function ModelList({ models, setSelectedModel }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {models.map((model) => (
        <button
          key={model._id}
          onClick={() => setSelectedModel(model.url)}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          {model.name}
        </button>
      ))}
    </div>
  );
}
