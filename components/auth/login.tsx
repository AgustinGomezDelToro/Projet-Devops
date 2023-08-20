import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importa el hook useRouter de Next.js

function Login() {
    const router = useRouter(); // Inicializa el hook
    const [credentials, setCredentials] = useState({"email": '', "password": ''});

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', credentials);
            if (response.data.message === "Inicio de sesión exitoso!") {
                // Si el inicio de sesión es exitoso, redirige al usuario al dashboard
                router.push('/dashboard');
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Hubo un error al iniciar sesión:", error.response?.data);
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
