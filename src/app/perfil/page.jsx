"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./perfil.module.css";
import React, { useState, useEffect } from "react"; 
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

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
    } catch (e) { 
        console.error("Erro ao decodificar o token JWT", e);
        return null;
    }
}

export default function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [addedTeam, setAddedTeam] = useState([])
    const [form, setForm] = useState({
            team_name: '',
            user_id: '',
    })
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token não encontrado!');
                    router.push("/logIn");
                    return;
                }

                const payload = parseJwt(token);
                if (!payload?.id) {
                    console.error('ID do usuário não encontrado no token!');
                    router.push("/logIn"); 
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${payload.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Dados do usuário:', response.data);
                const user = Array.isArray(response.data) ? response.data[0] : response.data;
                setNome(user?.name || 'Usuário');
                setEmail(user?.email || 'email@exemplo.com');

            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error);
                router.push("/logIn");
            } finally {
                setLoading(false);
            }
        };

        getUserData(); 
    }, [router]);
    if (loading) {
        return (
            <div>
                <Header />
                <div className={styles.loadingContainer}>
                    <h1>Carregando perfil...</h1>
                </div>
                <Footer />
            </div>
        );
    }

        const criarTime = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const payload = parseJwt(token);
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
                    team_name: form.team_name.trim(),
                    userId: payload.id
                });
                setAddedTeam([response.data, ...addedComment]);
                setForm({ team_name: "", user_id: payload.id });
            } catch (error) {
                console.error("❌ Erro ao criar comentário:", error);
            } finally {
                setLoading(false);
            }
        }

        const atualizarTime = (e) => {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value });
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
                                <p>Email: {email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="text" 
                        name="team_name"
                        value={form.team_name}
                        onChange={atualizarTime}
                        placeholder="Nome"
                        required
                        />
                          <button onClick={criarTime} disabled={!form.team_name.trim() || loading}>
                          {loading ? "Criando..." : "Criar Time"}
                          </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}