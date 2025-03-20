const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secreto_super_seguro';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;  // Obtener el header 'Authorization'
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];  // Extraer el token del header 'Authorization: Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar el token JWT
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        
        req.user = decoded;  // Guardar los datos del usuario en 'req.user' para usarlos en las rutas
        next();  // Continuar con la siguiente función en la cadena de middleware
    });
};

module.exports = authMiddleware;
