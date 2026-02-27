import { authService } from '../services/auth.service.js';

export const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const userId = await authService.register({ email, password });
            res.status(201).json({ message: 'Utilisateur créé', userId });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authService.login({ email, password });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}