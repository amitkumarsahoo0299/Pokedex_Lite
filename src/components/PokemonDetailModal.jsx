import React, { useEffect, useState } from 'react';

export default function PokemonDetailModal({ pokemon, onClose, onToggleFavorite, isFavorite }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (pokemon) {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => setDetails(data));
    }
  }, [pokemon]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-2xl"
        >
          &times;
        </button>
        <img
          src={details.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-32 h-32"
        />
        <h2 className="text-2xl font-bold text-center mt-4">{pokemon.name}</h2>
        <ul className="mt-4">
          <li><strong>Height:</strong> {details.height}</li>
          <li><strong>Weight:</strong> {details.weight}</li>
          <li><strong>HP:</strong> {details.stats.find(stat => stat.stat.name === 'hp').base_stat}</li>
          <li><strong>Attack:</strong> {details.stats.find(stat => stat.stat.name === 'attack').base_stat}</li>
          <li><strong>Abilities:</strong> {details.abilities.map((a) => a.ability.name).join(', ')}</li>
        </ul>
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(pokemon)}
          className={`mt-4 px-4 py-2 rounded-lg ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
}
