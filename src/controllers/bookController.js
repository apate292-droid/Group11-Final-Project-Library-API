import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../services/bookService.js';

export async function getAllBooksHandler(req, res) {
  const {
    authorId,
    search,
    sortBy = 'id',
    sortOrder = 'desc',
    limit = 10,
    offset = 0,
  } = req.query;

  const filter = {};
  if (authorId) filter.authorId = parseInt(authorId);
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  const books = await getAllBooks(filter);
  res.status(200).json(books);
}

export async function getBookByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  res.status(200).json(book);
}

export async function createBookHandler(req, res) {
  const data = {
    title: req.body.title,
    authorId: req.body.authorId,
  };
  const newBook = await createBook(data);
  res.status(201).json(newBook);
}

export async function updateBookHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const updatedBook = await updateBook(id, updates);
  res.status(200).json(updatedBook);
}

export async function deleteBookHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteBook(id);
  res.status(204).send();
}
