"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";

const HEADERS = {'x-api-key': process.env.NEXT_PUBLIC_API_KEY}

export default function Home() {
  const [data, setData] = useState({
    pokemons: [],
    loading: true,
    current: 1,
    pageSize: 10, // valor padrão para paginação
  });
  
  useEffect(() => {
    const fetchPokemons = async () => {
      setData((d) => ({ ...d, loading: true }));
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pokemons`, {
          headers: HEADERS,
        });
        setData((d) => ({ ...d, pokemons: response.data, loading: false }));
      } catch (error) {
        setData((d) => ({ ...d, loading: false }));
      }
    };
    fetchPokemons();
  }, []);

  const paginatedPokemons = () => {
    const startIndex = (data.current - 1) * data.pageSize;
    const endIndex = startIndex + data.pageSize;
    return data.pokemons.slice(startIndex, endIndex);
  };
  
  const onChange = (page) => {
    setData((d) => ({ ...d, current: page }));
  };

  return (
    
    <div className={styles.container}>
      <Pagination
        current={data.current}
        pageSize={data.pageSize || 10}
        total={data.pokemons.length}
        onChange={(page, pageSize) => setData(prev => ({
          ...prev,
          current: page,
          pageSize: pageSize,
        }))}
      />
      <div className={styles.card}>
        {data.loading ? (
          <p>Carregando...</p>
        ) : (
          paginatedPokemons().map((pokemon) => (
            <div key={pokemon.id} className={styles.cardItem}>
              <p>{pokemon.name}</p>
              <p>{pokemon.height}</p>
              <p>{pokemon.weight}</p>
              <p>{pokemon.evolves_from_species}</p>
              <p>{pokemon.evolves_to_species}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
