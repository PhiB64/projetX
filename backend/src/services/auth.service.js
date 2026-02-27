import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';
import pool from '../config/database.js';
import { sendVerificationEmail } from './email.service.js';

export const authService = {
  // Inscription
  async register({ email, password, passwordConfirm }) {
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    if (password !== passwordConfirm) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    // Vérifier si utilisateur existe
    const [users] = await pool.query(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );
    if (users.length > 0) {
      throw new Error('Cet email est déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await argon2.hash(password);

    // Générer un token de vérification
    const verificationToken = uuidv4();

    // Créer l'utilisateur
    const result = await pool.query(
      'INSERT INTO users (email, password, verification_token, is_verified) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, verificationToken, false]
    );

    const userId = result[0].insertId;

    // Envoyer l'email de vérification
    await sendVerificationEmail(email, verificationToken);

    return userId;
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    // Chercher l'utilisateur
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const user = users[0];

    // Vérifier le mot de passe
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier si email est confirmé
    if (!user.is_verified) {
      throw new Error('Veuillez vérifier votre email d\'abord');
    }

    // Créer le JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return token;
  },

  // Vérifier l'email via le token
  async verifyEmail(token) {
    if (!token) {
      throw new Error('Token manquant');
    }

    // Chercher l'utilisateur avec ce token
    const [users] = await pool.query(
      'SELECT * FROM users WHERE verification_token = ?',
      [token]
    );

    if (users.length === 0) {
      throw new Error('Token invalide ou expiré');
    }

    const user = users[0];

    // Vérifier si déjà confirmé
    if (user.is_verified) {
      throw new Error('Email déjà vérifié');
    }

    // Marquer comme vérifié et vider le token
    await pool.query(
      'UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?',
      [user.id]
    );

    return {
      message: 'Email vérifié avec succès',
      userId: user.id,
      email: user.email
    };
  }
};