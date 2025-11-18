import {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  removeAuthor,
} from '../services/authorService.js';

export async function getAllAuthorsHandler(req, res) {
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

  const result = await getAllAuthors(filter);
  res.status(200).json(result);
}

export async function createAuthorHandler(req, res) {
  const data = req.body;
  const newAuthor = await createAuthor(data);
  res.status(201).json(newAuthor);
}

export async function updateAuthorHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const updatedAuthor = await updateAuthor(id, updates);
  res.status(200).json(updatedAuthor);
}

export async function deleteAuthorHandler(req, res) {
  const id = parseInt(req.params.id);
  await removeAuthor(id);
  res.status(204).send();
}
