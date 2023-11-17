import fetch from 'isomorphic-unfetch';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Méthode non autorisée
    }

    const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://tu-dominio-en-produccion.com/api/Calendar/Calendar'
        : 'http://localhost:3000/api/Calendar/Calendar';

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
        if (error instanceof Error) {
            console.error("Erreur lors de la création de l'événement dans le calendrier :", error.message);
            return res.status(500).json({ error: "Erreur lors de la création de l'événement dans le calendrier", details: error.message });
        } else {
            // Manejo de otros tipos de errores o rechazarlos aquí
            console.error("Une erreur inconnue s'est produite");
            return res.status(500).json({ error: "Une erreur inconnue s'est produite" });
        }
    }
};
