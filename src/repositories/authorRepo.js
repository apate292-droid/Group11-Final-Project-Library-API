import prisma from '../config/db.js';

export async function getAll(filter = {}) {
  const { 
    search, 
    sortBy = 'id', 
    sortOrder = 'asc', 
    limit = 10, 
    offset = 0 } = filter;

  const conditions = {};
  if (filter.search) {
    conditions.name = { 
      contains: search, 
      mode: 'insensitive' };
  }

  return prisma.author.findMany({
    where: conditions,
    select: {
      id: true,
      name: true,
    },
    orderBy: { [sortBy]: sortOrder },
    take: limit,
    skip: offset,
  });
}


export async function create(author) {
  const newAuthor = await prisma.author.create({
    data: author
    });
  return newAuthor;
}
export async function update(id, updates) {
  try {
    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: updates,
    });
    return updatedAuthor;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}


export async function remove(id) {
  try {
    const deletedAuthor = await prisma.author.delete({ 
      where: { id } 
    });
    return deletedAuthor;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}




export async function existsAuthorByName(name) {
  const count = await prisma.author.count({ where: { name } });
  return count > 0;
}
