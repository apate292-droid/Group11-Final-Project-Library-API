import {
    getAll,
    getById,
    create,
    update,
    remove,
    existsBookByTitle
  } from '../repositories/bookRepo.js';
  import { existsAuthorById } from '../repositories/authorRepo.js';
  
  export async function getAllBooks(filter) {
    return getAll(filter);
  }
  
  export async function getBookById(id) {
    const result = await getById(id);
    if (!result) {
      const error = new Error(`Cannot find book with id ${id}`);
      error.status = 404;
      throw error;
    }
    return result;
  }
  
  export async function createBook(data) {
    if (!(await existsAuthorById(data.authorId))) {
      const error = new Error(`Invalid authorId: ${data.authorId}`);
      error.status = 400;
      throw error;
    }
  
    if (await existsBookByTitle(data.title, data.authorId)) {
      const error = new Error(`Book "${data.title}" by this author already exists`);
      error.status = 400;
      throw error;
    }
  
    return create(data);
  }
  
  export async function updateBook(id, data) {
    const updated = await update(id, data);
    if (!updated) {
      const error = new Error(`Cannot find book with id ${id}`);
      error.status = 404;
      throw error;
    }
    return updated;
  }
  
  export async function deleteBook(id) {
    const deleted = await remove(id);
    if (!deleted) {
      const error = new Error(`Cannot find book with id ${id}`);
      error.status = 404;
      throw error;
    }
    return true;
  }
  