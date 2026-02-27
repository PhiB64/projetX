import jwt from "jsonwebtoken";
import{ env } from '../config/env.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "pas d'autorisation" });
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({ message: "token invalide" });
        }
    }
}