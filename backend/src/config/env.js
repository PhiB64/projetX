import 'dotenv/config';

export const env = {
  
  PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
   SMTP_HOST: process.env.SMTP_HOST,
   SMTP_PORT: process.env.SMTP_PORT,
   SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
   MAILERLITE_API_URL: process.env.MAILERLITE_API_URL,
   MAILERLITE_API_KEY: process.env.MAILERLITE_API_KEY,
   MAILERLITE_FROM_EMAIL: process.env.MAILERLITE_FROM_EMAIL,
   FRONTEND_URL: process.env.FRONTEND_URL
};