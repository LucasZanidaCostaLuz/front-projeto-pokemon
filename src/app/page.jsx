"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";

const HEADERS = {'x-api-key': process.env.NEXT_PUBLIC_API_KEY}

export default function Home() {
  const [data, setData] = useState({
    pokemons: [],
    loading: false,
    current: 1,
    pageSize: 0,
  });
  
   useEffect(() => {
        const fetchPokemons = async () => {
            try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pokemons`, {
                headers: HEADERS
            });
            setData((d) => ({...d, pokemons: response.data, loading: false,}));
            } catch (error) {
            setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchPokemons();
    }, []);

    const paginatedBairros = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.bairros.slice(start, start + data.pageSize);
    };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {data.pokemons.map((pokemon) => (
          <div key={pokemon.id} className={styles.cardItem}>
            <p>{pokemon.name}</p>
            <p>{pokemon.height}</p>
            <p>{pokemon.weight}</p>
            <p>{pokemon.evolves_from_species}</p>
            <p>{pokemon.evolves_to_species}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
