"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import styles from "./profilePokemon.module";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function GetPokemonById() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const pokemonId = params.id;

  const buscarPokemon = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pokemons/${pokemonId}`,
        { headers: HEADERS }
      );
      setPokemon(response.data);
    } catch (error) {
      setError(true);
      console.error("erro ao buscar pokemon", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPokemon();
  }, [pokemonId]);

  if (loading) return <div> ...Carregando </div>;
  if (error) return <div> Erro ao carregar pokemons</div>;
  if (!pokemon) return <div> Pokemon não encontrado </div>;

  return (
    <div>
      <h1>Nome do pokemon: {pokemon.name}</h1>
      <h1>descrição do pokemon: </h1>
      <h1>{pokemon.description}</h1>
      <h1> altura: {pokemon.height}</h1>
      <h1> peso : {pokemon.weight}</h1>
      <Image
        src={pokemon.image}
        alt="imagem de pokemon"
        width={300}
        height={300}
      />
      <h1>id do pokemon: {pokemon.id}</h1>
      <ul>
        <h1>Tipos:</h1>
        {pokemon.types.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <ul>
        <h1>Habilidades:</h1>
        {pokemon.abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>
      <ul>
        <h1>Status:</h1>
        {pokemon.stats &&
          Object.entries(pokemon.stats).map(([statName, statValue]) => (
            <li key={statName}>
              {statName}: {statValue}
            </li>
          ))}
      </ul>
    </div>
  );
}
