import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; 

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: 'Authentication failed: No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: decoded.id || decoded.userId,    // Try 'id' first, fall back to 'userId' if not found
            role: decoded.role
        };

        next();

    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token has expired. Please login again.'
            });
        }
        
        return res.status(401).json({ 
            message: 'Invalid token. Please login again.'
        });
    }
};

export default authenticate;