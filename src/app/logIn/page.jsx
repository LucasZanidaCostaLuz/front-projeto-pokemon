"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from 'antd';
import styles from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const handleLogin = async () => {

        if (loading) return; 
        
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/auth`, {
                email,
                password_hash: password, 
            });

            const { token } = response.data;

            if (!token) {
                throw new Error('Token não encontrado na resposta!');
            }

            localStorage.setItem('token', token); 
            
            setSuccess('Login realizado com sucesso! Redirecionando...');
            
            setLoading(false); 

            setTimeout(() => {
                router.push('/pokedex'); 
            }, 1000);

        } catch (error) {
            setLoading(false); 
            
            let errorMessage = 'Erro ao fazer login! Verifique suas credenciais.';
            
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data?.message || errorMessage; 
            } else if (error instanceof Error) {
                errorMessage = error.message; 
            }

            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>

                <div className={styles.form}>
                    <Input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.inputs}
                        disabled={loading}
                    />

                    <Input
                        placeholder="Senha"
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.target.value)} 
                        className={styles.inputs}
                        disabled={loading}
                    />
                    
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    
                    <button 
                        className={styles.entrar} 
                        onClick={handleLogin} 
                        disabled={loading || !email || !password} 
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>
            </div>
        </div>
    );
    }