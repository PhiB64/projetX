import pool from '../config/database.js';


class UserRepository {
  // Créer un utilisateur
  async create(user) {    
    const [result] = await pool.query(
      'INSERT INTO users (email, password, verication_token) VALUES (?, ?, ?)',
      [user.email, user.password, user.verificatioToken]
    );
    return result.insertId;
  }

  // Trouver un utilisateur par email
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Trouver les utilisateurs connectés
  async getActiveUsers() {
    const [rows] = await pool.query(
      'SELECT id, email, latitude, longitude, FROM users WHERE last_seen > (NOW(), INTERVAL 3 MINUTE)',
      
    );
    return rows;
  }
  

  // Mettre à jour la position des utilisateurs toutes les 3 minutes
  async updateLocation(userId, latitude, longitude) {
    await pool.query(
      'UPDATE users SET latitude = ?, longitude = ?, last_seen = NOW() WHERE id = ?',
      [latitude, longitude, userId]
    );
  }
 
}

export default new UserRepository();
