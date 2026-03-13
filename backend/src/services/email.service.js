import { Resend } from 'resend';
import { env } from '../config/env.js';

// Envoyer un email
async function sendEmail(to, subject, html) {
  const resend = new Resend(env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Erreur envoi email:', error);
      return { success: false, error };
    }

    console.log('Email envoyé à:', to, '| id:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Erreur envoi email:', error.message);
    return { success: false, error: error.message };
  }
}

// Envoyer un email de vérification
async function sendVerificationEmail(email, token) {
  const verificationLink = `${env.FRONTEND_URL}/auth/verify/${token}`;

  const html = `
    <h2>Vérifiez votre email</h2>
    <p>Cliquez sur le lien ci-dessous pour confirmer votre email :</p>
    <a href="${verificationLink}" style="background:#4F46E5;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Vérifier mon email</a>
    <p>Ce lien expire dans 24 heures.</p>
  `;

  return sendEmail(email, 'Vérification de votre email - ProjetX', html);
}

export { sendEmail, sendVerificationEmail };
