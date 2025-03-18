const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secreto_super_seguro';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
        req.user = decoded; 
        next();
    });
};

module.exports = authMiddleware;
