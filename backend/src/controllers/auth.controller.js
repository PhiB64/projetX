import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req, res, next) {
    try {
      const { email, password, passwordConfirm } = req.body;
      const userId = await authService.register({ email, password, passwordConfirm });
      res.status(201).json({
        message: 'Inscription réussie ! Vérifiez votre email',
        userId,
        email
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.login({ email, password });
      res.status(200).json({
        message: 'Connexion réussie',
        token
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      const user = await authService.verifyEmail(token);
      if (!user) { res.status(400).json({ message: 'Token de vérification invalide ou expiré' });
      }
      res.status(200).json({ message: 'Utilisateur vérifié avec succès', user });
    } catch (error) {
      next(error);
    }
  }
};
