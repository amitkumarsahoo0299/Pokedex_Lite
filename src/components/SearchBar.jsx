export default function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon"
        className="block w-full max-w-md mx-auto p-2 border border-gray-300 rounded-md mb-4 focus:ring focus:ring-blue-300"
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  }
  