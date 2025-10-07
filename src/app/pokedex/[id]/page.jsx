"use client";

import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import styles from "./profilePokemon.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { typeColors } from "@/utils/colors.js";
import { useRouter } from "next/navigation";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function GetPokemonById() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const pokemonId = params.id;
  const router = useRouter();

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

  const mainType = pokemon.types?.[0] || "normal"; 
  const color = typeColors[mainType] || "#f0f0f0"; 

  const handleBackClick = () => {
    router.push('/pokedex');
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container} style={{ borderColor: color }}>
        <h1 className={styles.nome}>
          <span className={styles.span} style={{ color }}>Nome do pokemon:</span> {pokemon.name}
        </h1>
        <h1 className={styles.description}>
          <span className={styles.span} style={{ color }}>descrição do pokemon:</span> {pokemon.description}
        </h1>
        <h1 className={styles.height}> <span className={styles.span} style={{ color }}>altura:</span> {(pokemon.height / 10).toFixed(1)} m </h1>
        <h1 className={styles.weight}> <span className={styles.span} style={{ color }}>peso:</span> : {(pokemon.weight / 10).toFixed(1)} Kg</h1>
        <Image
          src={pokemon.image}
          alt="imagem de pokemon"
          width={300}
          height={300}
          className={styles.image}
        />
        <h1 className={styles.numero}><span className={styles.span} style={{ color }}>numero do pokemon</span> {pokemon.id}</h1>
        <ul className={styles.types}>
          <h1 className={styles.type_text} style={{ color }}>Tipos:</h1>
          {pokemon.types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <ul className={styles.abilities}>
          <h1 className={styles.abilities_text} style={{ color }}>Habilidades:</h1>
          {pokemon.abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
        <ul className={styles.stats}>
          <h1 className={styles.stats_text} style={{ color }}>Status:</h1>
          {pokemon.stats &&
            Object.entries(pokemon.stats).map(([statName, statValue]) => (
              <li key={statName}>
                {statName}: {statValue}
              </li>
            ))}
        </ul>
        <button className={styles.button} style={{ backgroundColor: color }} onClick={(handleBackClick)} >Voltar</button>
      </div>
      
      <Footer />
    </div>
  );
}