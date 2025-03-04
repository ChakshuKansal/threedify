export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <input
        type="text"
        placeholder="Search models..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
    );
  }
  