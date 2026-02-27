import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD
  }
});

// Tester la connexion SMTP
async function testConnection() {
  try {
    await transporter.verify();
    console.log('Connexion SMTP OK');
  } catch (error) {
    console.error('Erreur SMTP:', error.message);
  }
}

// Envoyer un email
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"ProjetX" <${env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log('Email envoyé:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Erreur envoi email:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Envoyer un email de vérification
async function sendVerificationEmail(email, token) {
  const verificationLink = `${env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const html = `
    <h2>Vérifiez votre email</h2>
    <p>Cliquez sur le lien ci-dessous pour confirmer votre email:</p>
    <a href="${verificationLink}">Vérifier mon email</a>
    <p>Ce lien expire dans 24 heures.</p>
  `;

  return sendEmail(email, 'Vérification de votre email', html);
}

// Test connection au démarrage
testConnection();

export { sendEmail, sendVerificationEmail, testConnection };
