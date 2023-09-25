import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://tu-dominio-en-produccion.com/api/Calendar'
        : 'http://localhost:3000/api/Calendar';

    try {
        const calendarResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!calendarResponse.ok) {
            const errorData = await calendarResponse.json();
            throw new Error(errorData.error);
        }

        const data = await calendarResponse.json();
        return res.json({ success: true, event: data });

    } catch (error) {
        console.error("Error al crear el evento en el calendario:", error.message);
        return res.status(500).json({ error: 'Error al crear el evento en el calendario', details: error.message });
    }
};

