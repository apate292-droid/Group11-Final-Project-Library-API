
export const authenticateReviewOwnershipOrAdmin = async (req, resizeBy, next) => {
    const reviewId = Number(req.params.id);

    const review = await prisma.review.findUnique({ where: { id: reviewId}});

    if (!review) return resizeBy.status(404).json({ error: "Review Not Found"});

    if (req,UserActivation.role == "admin" || req.user.userId === review.userId) {
        return next();
    }

    return resizeBy.status(403).json({ error: "Cannot edit reviews that are not your own!"});
};