import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {v4 as uuid4} from 'uuid';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/user.repository.js';
import {emailservice} from './email.service.js';


const authService = {
    // Inscription
    async register({ email, password }) {

        // Hasher le mot de passe
        const hashedPassword = await argon2.hash(password);

        // Générer un token de vérification
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const userid = await userRepository.create({
            email,
            password: hashedPassword,
            verificatioToken: verificationToken
        });

        // Envoyer l'email de vérification
        await emailservice.sendVerificationEmail(email, verificationToken);

        return userid;
    },


    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Utilisateur non trouvé');

            const validPassword = await argon2.verify(user.password, password);
            if (!validPassword) {
                throw new Error('Mot de passe incorrect');

            }
            return jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '7d' });
        };
        
    }
}