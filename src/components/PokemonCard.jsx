import React from "react";
export default function PokemonCard({ pokemon, onSelect, onToggleFavorite, isFavorite }) {
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [pokemon.url]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(pokemon);
  };

  if (!details) return null;

  return (
    <div
      className="pokemon-card bg-white shadow-md rounded-md p-4 text-center cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
      onClick={() => onSelect(pokemon)}
    >
      <img src={details.sprites.front_default} alt={pokemon.name} className="mx-auto" />
      <h3 className="mt-2 text-lg font-semibold">{pokemon.name}</h3>
      <div className="flex justify-center mt-2">
        {details.types.map((type) => (
          <span
            key={type.type.name}
            className={`inline-block text-sm px-3 py-1 rounded-full mr-2 bg-${type.type.name}-500 text-white`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <button
        onClick={handleFavoriteClick}
        className={`mt-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}
