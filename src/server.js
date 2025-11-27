require('dotenv').config(); // Charge les variables (si local)
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// ✅ CORRECTION : On récupère les secrets depuis l'environnement
const SECRET = process.env.JWT_SECRET; 
// Si pas de secret (ex: oubli), on arrête tout par sécurité
if (!SECRET) { console.error("FATAL: JWT_SECRET manquant"); process.exit(1); }

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // ✅ CORRECTION : Comparaison avec les variables sécurisées
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// ✅ CORRECTION : On a supprimé la route /debug qui donnait trop d'infos
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.listen(3000, () => console.log('Secure server running'));