import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import Pagination from './components/Pagination';
import PokemonDetailModal from './components/PokemonDetailModal';
import Favorites from './components/Favorites';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(''); 
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10000') 
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results));
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });
  }, [currentPage]);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const isMatchingSearchQuery = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMatchingType = selectedType
      ? pokemon.types && pokemon.types.some((type) => type.type.name === selectedType) 
      : true; 
  
    return isMatchingSearchQuery && isMatchingType;
  });
  

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      if (prev.includes(pokemon)) {
        return prev.filter((fav) => fav !== pokemon);
      }
      return [...prev, pokemon];
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Pokedex Lite</h1>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <TypeFilter onTypeSelect={setSelectedType} /> 
      <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
      <PokemonList
        pokemonList={filteredPokemon} 
        searchQuery={searchQuery}
        selectedType={selectedType}
        onPokemonSelect={setSelectedPokemon}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
      />
      {!searchQuery && (
        <Pagination
          nextPage={() => nextPage && setCurrentPage(currentPage + 1)}
          prevPage={() => prevPage && setCurrentPage(currentPage - 1)}
        />
      )}
      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}
