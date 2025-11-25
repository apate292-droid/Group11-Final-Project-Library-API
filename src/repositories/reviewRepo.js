import { prisma } from '../config/db.js';

export async function getAll(filter) {
  const {
    bookId,
    rating,
    sortBy = 'id',
    sortOrder = 'asc',
    limit = 10,
    offset = 0,
  } = filter;

  const conditions = {};

  if (bookId) conditions.bookId = parseInt(bookId);
  if (rating) conditions.rating = parseInt(rating);

  return prisma.review.findMany({
    where: conditions,
    select: {
      id: true,
      rating: true,
      comment: true,
      bookId: true,
      userId: true,
    },
    orderBy: { [sortBy]: sortOrder },
    take: limit,
    skip: offset,
  });
}

export async function create(review) {
  const newReview = await prisma.review.create({
    data: review,
  });
  return newReview;
}

export async function update(id, updates) {
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: updates,
    });
    return updatedReview;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
    });
    return deletedReview;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}