import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    // Exécute le script shell lorsqu'une notification est reçue
    exec('sh /Projet-Devops/deploy-script.sh', (error, stdout, stderr) => {
        if (error) {
            console.error('Erreur lors de l\'exécution du script shell :', error);
            return res.status(500).json({ erreur: 'Erreur lors de l\'exécution du script shell', détails: error.message });
        }
        console.log('Script shell exécuté avec succès :', stdout);
        res.status(200).json({ message: 'Script shell exécuté avec succès' });
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
