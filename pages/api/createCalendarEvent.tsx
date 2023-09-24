// pages/api/createCalendarEvent.tsx
import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const token = req.cookies.myTokenName;

    console.log("Token recibido en createCalendarEvent:", token); // Añadido

    if (!token) {
        return res.status(401).json({ error: 'Token no encontrado' });
    }




    try {
        // Añadiendo la dirección completa
        const API_URL = process.env.NODE_ENV === 'production' ?
            'https://tu-dominio-en-produccion.com/api/Calendar' :
            'http://localhost:3000/api/Calendar';

        const calendarResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Pasar el token en los headers si es necesario para /api/Calendar
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(req.body),
        });

        const data = await calendarResponse.json();

        if (!calendarResponse.ok) {
            return res.status(calendarResponse.status).json(data);
        }

        return res.json({ success: true, event: data });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el evento en el calendario', details: error.message });
    }
};


