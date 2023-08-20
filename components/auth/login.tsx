import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [credentials, setCredentials] = useState({"email": '', "password": ''});

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        try {
            const response = await axios.post('/api/auth/login', credentials);
            console.log(response.data);
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
