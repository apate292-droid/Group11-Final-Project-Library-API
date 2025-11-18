import {
  getAll,
  create,
  update,
  remove,
  existsAuthorByName,
} from '../repositories/authorRepo.js';

export async function getAllAuthors(filter) {
  return getAll(filter);
}


export async function createAuthor(data) {
  if (await existsAuthorByName(data.name)) {
    const error = new Error(`Author name already exists: ${data.name}`);
    error.status = 400;
    throw error;
  }
  return await create(data);
}

export async function updateAuthor(id, data) {
  const updatedAuthor = await update(id, data);  
  if (updatedAuthor) return updatedAuthor;        
  else {
    const error = new Error(`Cannot find author with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function removeAuthor(id) {
  const result = await remove(id);  
  if (!result) {
    const error = new Error(`Cannot find Author with id ${id}`);
    error.status = 404;
    throw error;
  }
  return true;  
}
