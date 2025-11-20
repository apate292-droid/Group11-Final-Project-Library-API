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
    const data = {
      comment: req.body.comment,
      rating: req.body.rating,
      bookId: req.body.bookId,
      userId: req.body.userId,
    };
    const newReview = await createReview(data);
    res.status(201).json(newReview);
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
  