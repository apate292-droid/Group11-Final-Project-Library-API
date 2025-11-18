import {
  getAll,
  create,
  update,
  remove,
} from '../repositories/reviewRepo.js';


import { exists as bookExists } from '../repositories/bookRepo.js'; 


export async function getAllReviews(filter) {
  return await getAll(filter);
}


export async function createReview(data) {
  if (!(await bookExists(data.bookId))) {
    const error = new Error(`Invalid bookId: ${data.bookId}`);
    error.status = 400; 
    throw error;
  }

  return await create(data); 
}


export async function updateReview(id, data) {
    const updatedReview = await update(id, data);  
    if (updatedReview) return updatedReview;         
    else {
      const error = new Error(`Cannot find review with id ${id}`);
      error.status = 404;
      throw error;
    }
  }
export async function deleteReview(id) {
    const result = await remove(id); 
    if (!result) {
      const error = new Error(`Cannot find review with id ${id}`);
      error.status = 404;
      throw error;
    }
    
    return true; 
  }
  
