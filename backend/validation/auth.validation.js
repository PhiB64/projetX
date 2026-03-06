import {z} from 'zod';

export const registrationSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, { message: "Password must contain at least one uppercase letter and one number" }),

});

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
       
});