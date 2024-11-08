import React, { useEffect, useState } from 'react';
import './ItemPoke.css';

const ItemPoke = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          if (!detailsResponse.ok) throw new Error('Erro ao buscar detalhes do Pokémon');

          const detailsData = await detailsResponse.json();
          return {
            name: pokemon.name,
            image: detailsData.sprites.front_default,
          };
        });

        const pokemonsWithDetails = await Promise.all(promises);
        setItems(pokemonsWithDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="pokemon-list">
      {items.map((item, index) => (
        <div key={index} className="pokemon-card">
          <img src={item.image} alt={item.name} className="pokemon-image" />
          <p className="pokemon-name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemPoke;
