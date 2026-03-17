import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({message: 'Email invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
});

export const registerSchema = z.object({

    email: z.string().email({message: 'Email invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
    passwordConfirm: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
});