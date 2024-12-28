export default function Favorites({ favorites, onToggleFavorite }) {
    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {favorites.map((pokemon) => (
              <div
                key={pokemon.name}
                className="bg-white shadow-md rounded-md p-2 text-center cursor-pointer"
                onClick={() => onToggleFavorite(pokemon)}
              >
                {pokemon.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  