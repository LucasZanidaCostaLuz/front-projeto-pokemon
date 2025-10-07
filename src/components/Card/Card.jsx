import Image from 'next/image';
import styles from './Card.module.css';
import { typeColors } from '../../lib/colors';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function DetailedPokemonCard({ pokemon }) {
  if (!pokemon) {
    return null;
  }

  const mainType = pokemon.types?.[0] || 'normal';
  const cardColor = typeColors[mainType];
  const cardGradient = `linear-gradient(135deg, ${cardColor} 50%, #f0f0f0 50%)`;

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/pokedex/${pokemon.id}`);
  }

  return (
    <div className={styles.card} style={{ borderColor: cardColor }}>
      <div className={styles.cardHeader} style={{ background: cardGradient }}>
        <h2 className={styles.name}>{pokemon.name}</h2>
        <span className={styles.hp}>HP {pokemon.stats?.hp}</span>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={180}
          height={180}
          className={styles.image}
        />
      </div>
      <div className={styles.typesContainer}>
        {pokemon.types?.map((typeName) => (
          <span 
            key={typeName} 
            className={styles.typeBadge} 
            style={{ backgroundColor: typeColors[typeName] }} 
          >
            {typeName}
          </span>
        ))}
      </div>
      <div className={styles.footer} style={{ backgroundColor: cardColor }}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
          <span className={styles.statLabel}>Peso</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{(pokemon.height / 10).toFixed(1)} m</span>
          <span className={styles.statLabel}>Altura</span>
        </div>
        <button className={styles.detailsButton} onClick={handleCardClick}>
        Detalhes
      </button>
      </div>
      
    </div>
  );
};