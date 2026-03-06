import express from 'express';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import ratelimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middleware/error.middleware.js';
import userRoutes from './routes/user.route.js';


const app = express();
const PORT = env.PORT || 3000;

app.use(cors({ origin: env.FRONTEND_URL || '*' }));

app.use(express.json());

app.use(helmet({ contentSecurityPolicy: false })); //active en production avec la config adaptée

app.use(ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 50
}));

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
});

app.use(limiter);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;