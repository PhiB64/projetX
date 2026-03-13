import mysql from 'mysql2/promise';
import { env } from './env.js';

// Connexion à MySQL
const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT || 3306,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 80,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test rapide de connexion
const connection = await
  pool.getConnection();
    console.log('Connexion à la base de données réussie !', env.DB_NAME);
    connection.release();




export default pool;
