import styles from './Header.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header (){
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/perfil');
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.pokeballButton}>
        <div className={styles.pokeballInnerCircle} onClick={handleLogoClick}>
          <button className={styles.perfil} >
            Perfil
          </button>
        </div>
      </div>
      
    </header>
  );
};