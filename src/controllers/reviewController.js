import {
    getAllReviewsByBook,
    createReview,
    updateReview,
    deleteReview,
  } from '../services/reviewService.js';
  

  export async function getAllReviewsByBookHandler(req, res) {
    const bookId = parseInt(req.params.bookId);
    const reviews = await getAllReviewsByBook(bookId);
    res.status(200).json(reviews);
  }
  
  
  export async function createReviewHandler(req, res) {
    const data = {
      bookId: parseInt(req.body.bookId),
      userId: req.user.id, 
      rating:req.body.rating,
      comment: req.body.comment,
    };
    const newReview = await createReview(data);
    res.status(201).json(newReview);
  }
  

  export async function updateReviewHandler(req, res) {
    const reviewId = parseInt(req.params.id);
    const updates = {
      rating: req.body.rating,
      comment: req.body.comment,
    };
    const updatedReview = await updateReview(reviewId, updates);
    res.status(200).json(updatedReview);
  }

  export async function deleteReviewHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteReview(id);
    res.status(204).send();
  }
