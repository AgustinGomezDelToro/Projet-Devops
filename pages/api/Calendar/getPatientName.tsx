app.get('/api/Calendar/:id', (req, res) => {
    // Obtener el ID desde el parámetro de la ruta
    const eventId = req.params.id;

    // Buscar el evento en tu base de datos o array
    const event = calendarEvents.find(e => e.id === eventId);

    if (event) {
        res.json(event); // Si el evento se encuentra, se devuelve como respuesta
    } else {
        res.status(404).send('Evento no encontrado'); // Si no se encuentra, devolver un error 404
    }
});