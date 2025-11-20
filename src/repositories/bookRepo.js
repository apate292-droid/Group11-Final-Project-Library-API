
import prisma from '../config/db.js';

export async function getAll(filter) {
  const { 
    search, 
    sortBy = 'id', 
    sortOrder = 'asc', 
    limit = 10, 
    offset = 0 } = filter;

  const conditions = {};
  if (filter.search) {
    conditions.title = { 
      contains: search, 
      mode: 'insensitive' };
  }

  return prisma.book.findMany({
    where: conditions,
    select: {
      id: true,
      title: true,
    },
    orderBy: { [sortBy]: sortOrder },
    take: limit,
    skip: offset,
  });
}

export async function getById(id) {
  const book = await prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
  return book;
}
export async function create(book) {
  const newBook = await prisma.book.create({
    data: book,
  });
  return newBook;
}

export async function update(id, updates) {
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: updates,
    });
    return updatedBook;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    return deletedBook;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}


export async function exists(id) {
  const count = await prisma.book.count({ where: { id } });
  return count > 0;
}


export async function existsBookByTitle(title) {
  const count = await prisma.book.count({ where: { title } });
  return count > 0;
}
