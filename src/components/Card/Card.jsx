import Image from 'next/image';
import styles from './Card.module.css'; // Verifique se o nome do arquivo CSS está correto
import { typeColors } from '../../lib/colors';

export default function DetailedPokemonCard({ pokemon }) {
  // Adiciona uma "guarda" para evitar erros se os dados ainda não chegaram
  if (!pokemon) {
    return null; // Ou um componente de loading
  }

  // CORRIGIDO: Acessa o primeiro tipo diretamente do array de strings
  const mainType = pokemon.types?.[0] || 'normal';
  const cardColor = typeColors[mainType];
  const cardGradient = `linear-gradient(135deg, ${cardColor} 50%, #f0f0f0 50%)`;

  return (
    <div className={styles.card} style={{ borderColor: cardColor }}>
      <div className={styles.cardHeader} style={{ background: cardGradient }}>
        <h2 className={styles.name}>{pokemon.name}</h2>
        {/* CORRIGIDO: Acessa o HP diretamente do objeto 'stats' */}
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
        {/* CORRIGIDO: Mapeia o array de strings diretamente */}
        {pokemon.types?.map((typeName) => (
          <span 
            key={typeName} // CORRIGIDO
            className={styles.typeBadge} 
            style={{ backgroundColor: typeColors[typeName] }} // CORRIGIDO
          >
            {typeName} {/* CORRIGIDO */}
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
      </div>
    </div>
  );
};