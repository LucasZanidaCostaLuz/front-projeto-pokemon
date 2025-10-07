"use client";

import React from "react";
import styles from "./sobre.module.css";
import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();
    return (
        <div className={styles.page}>
            <div className={styles.container}>
            <h1 className={styles.title}>Sobre o Projeto Pokémon</h1>
            <p className={styles.description}>
                Este projeto foi desenvolvido como parte de um desafio técnico para a empresa XPTO. O objetivo era criar uma aplicação web utilizando Next.js, React e outras tecnologias modernas.
            </p>
            <h2 className={styles.subtitle}>Tecnologias Utilizadas</h2>
            <ul className={styles.techList}>
                <li>Next.js</li>
                <li>React</li>
                <li>Axios</li>
                <li>Ant Design</li>
                <li>CSS Modules</li>
                <li>API RESTful</li>
            </ul>
            <h2 className={styles.subtitle}>Funcionalidades</h2>
            <ul className={styles.featureList}>
                <li>Autenticação de Usuário</li>
                <li>Listagem de Pokémons com Paginação</li>
                <li>Detalhes do Pokémon ao clicar na carta</li>
                <li>Design Responsivo</li>
                <li>Tratamento de Erros e Estados de Carregamento</li>
            </ul>
            <p className={styles.footer}>
                Desenvolvido por Lucas Zani - 2025
            </p>
            <button className={styles.button} onClick={() => router.push('/logIn')}>
                Ir para Login
            </button>
        </div>
        </div>
    );
}