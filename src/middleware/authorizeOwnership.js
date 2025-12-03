import { prisma } from '../config/db.js';

const authorizeOwnerships = (modelName, idParam = 'id') => async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authentication required for ownerships check' });
    }

    const userId = req.user.id;
    const resourceId = parseInt(req.params[idParam]);

    try {
        const resource = await prisma[modelName].findUnique({
            where: { id: resourceId },
            select: { userId: true } 
        });

        if (!resource) {
            return res.status(404).json({ message: `${modelName} not found.` }); 
        }

        if (resource.userId === userId) {
            next(); 
        } else {
            res.status(403).json({ message: 'Forbidden: You do not own this resource.' });
        }

    } catch (error) {
        console.error(`Database error during ownership check for ${modelName}:`, error);
        res.status(500).json({ message: 'Authorization error processing request.' });
    }
};

export default authorizeOwnerships;
