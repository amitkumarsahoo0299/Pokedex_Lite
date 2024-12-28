import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList({
  pokemonList,
  searchQuery,
  selectedType,
  onPokemonSelect,
  onToggleFavorite,
  favorites,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onSelect={() => onPokemonSelect(pokemon)}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(pokemon)}
        />
      ))}
    </div>
  );
}
