"use client";

import React from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useState } from "react";

export default function logInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async () => {
        
    }

    return <div>Login Page</div>;
}