import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ratelimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 50
}));

app.use('/auth', authRoutes);

app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;