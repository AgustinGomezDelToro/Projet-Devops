import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        if (response.data.message === "Inicio de sesión exitoso!") {
            return true; // Retornar verdadero si el inicio de sesión es exitoso
        } else {
            console.log(response.data);
            return false;
        }
    } catch (error) {
        console.error("Hubo un error al iniciar sesión:", error.response?.data);
        return false;
    }
};

function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ "email": '', "password": '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginSuccess = await loginUser(credentials);
        if (loginSuccess) {
            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;
