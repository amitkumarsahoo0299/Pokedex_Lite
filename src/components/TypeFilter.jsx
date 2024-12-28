import React, { useState, useEffect } from 'react';

export default function TypeFilter({ onTypeSelect }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type') 
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  const handleTypeSelect = (event) => {
    const selectedType = event.target.value;
    onTypeSelect(selectedType); 
  };

  return (
    <select
      className="block w-full max-w-md mx-auto p-2 border border-gray-300 rounded-md mb-4 focus:ring focus:ring-blue-300"
      onChange={handleTypeSelect}
    >
      <option value="">All Types</option> 
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}
