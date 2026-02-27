export const errorHandler = (err, req, res, next) => {
    console.error('Erreur:', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erreur interne du serveur';

    res.status(statusCode).json({ success: false, error: message });
}