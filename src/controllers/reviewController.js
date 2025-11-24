import {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview,
  } from '../services/reviewService.js';
  
  export async function getAllReviewsHandler(req, res) {
    const {
      bookId,
      rating,
      sortBy = 'id',
      sortOrder = 'desc',
      limit = 10,
      offset = 0,
    } = req.query;
  
    const filter = {};
    if (bookId) filter.bookId = parseInt(bookId);
    if (rating) filter.rating = parseInt(rating);
    filter.sortBy = sortBy;
    filter.sortOrder = sortOrder;
    filter.limit = parseInt(limit);
    filter.offset = parseInt(offset);
  
    const reviews = await getAllReviews(filter);
  
    res.status(200).json(reviews);
  }


export async function createReviewHandler(req, res) {
  try {
    const authenticatedUserId = req.user.id;
    const {
      comment,
      rating,
      bookId,
    } = req.body;
    const reviewData = {
      comment,
      rating,
      bookId,
      userId: authenticatedUserId,
    }
    const newReview = await createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error){
    console.error("Review Creation Failed:", error);
    res.status(500).json({
      message: "Review creation failed due to server error.",
      error: error.message
    });
  }
}

  export async function updateReviewHandler(req, res) {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const updatedReview = await updateReview(id, updates);
    res.status(200).json(updatedReview);
  }
  
  export async function deleteReviewHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteReview(id);
    res.status(204).send();
  }
  