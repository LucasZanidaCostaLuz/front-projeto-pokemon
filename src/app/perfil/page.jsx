"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./perfil.module.css";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
    if (!token) return console.error('Token não encontrado!');

    const payload = parseJwt(token);
    if (!payload?.id) return console.error('ID do usuário não encontrado no token!');

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${payload.id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Dados do usuário:', response.data);

    const user = Array.isArray(response.data) ? response.data[0] : response.data;
    setNome(user?.nome || '');
    setEmail(user?.email || '');
    } catch (error) {
      console.error("Erro ao buscar dados do usuário", error);
      router.push("/logIn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className={styles.containerProfile}>
          <div className={styles.arrowIcon}>
          </div>
          <div className={styles.profileHeader}>
            <div className={styles.userDetails}>
              <div className={styles.profileInfo}>
                <h1>Olá, {nome}</h1>
                <h1>email, {email}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
