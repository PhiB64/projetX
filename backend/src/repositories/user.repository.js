import pool from '../config/database.js';

class UserRepository {
  // Créer un utilisateur
  async create(userData) {
    const { email, password, username } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, password, username]
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

  // Trouver un utilisateur par ID
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Récupérer tous les utilisateurs
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }

  // Mettre à jour la position d'un utilisateur
  async updateLocation(userId, latitude, longitude) {
    await pool.query(
      'UPDATE users SET latitude = ?, longitude = ?, last_seen = NOW() WHERE id = ?',
      [latitude, longitude, userId]
    );
  }

  // Mettre à jour le statut de vérification
  async updateVerificationStatus(userId, isVerified) {
    await pool.query(
      'UPDATE users SET is_verified = ? WHERE id = ?',
      [isVerified, userId]
    );
  }

  // Supprimer un utilisateur
  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

export default new UserRepository();
