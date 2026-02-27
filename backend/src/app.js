import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { sendVerificationEmail } from './services/email.service.js';

const app = express();
const PORT = env.PORT || 3000;


app.use(cors());
app.use(express.json());







// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
