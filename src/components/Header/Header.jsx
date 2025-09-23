// components/PokedexHeader/PokedexHeader.js

import React from 'react';
import styles from './Header.module.css'; // Importando os estilos do nosso módulo CSS

export default function Header (){
  return (
    <header className={styles.pokedexHeader}>
      <div className={styles.pokedexTop}>
        <div className={styles.pokedexLensContainer}>
          <div className={styles.pokedexLens}>
            <div className={styles.lensHighlight}></div>
          </div>
        </div>
        <div className={styles.pokedexLights}>
          <div className={`${styles.light} ${styles.red}`}></div>
          <div className={`${styles.light} ${styles.yellow}`}></div>
          <div className={`${styles.light} ${styles.green}`}></div>
        </div>
      </div>
      <div className={styles.pokedexBottomLine}></div>
    </header>
  );
};