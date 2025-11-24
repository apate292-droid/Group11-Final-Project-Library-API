const authorizeRoles = (allowedRoles) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden Access' });
    }
};

export default authorizeRoles;
