import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'ProjetX API fonctionne !',
    status: 'OK'
  });
});

// Test connexion base de données
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json({ 
      message: 'Connexion BDD OK',
      nombreUsers: rows.length,
      users: rows
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur BDD',
      details: error.message
    });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
