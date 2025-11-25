import { prisma } from '../config/db.js';

export async function getAll() {
  return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

export async function getById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getByUserName(username) {
  return prisma.user.findUnique({ where: { username } });
}

export async function getByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },  
  });
}

export async function create(user) {
  return prisma.user.create({ data: user });
}

export async function update(id, updates) {
  try {
    return await prisma.user.update({ where: { id }, data: updates });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function existsByUserName(username) {
  const count = await prisma.user.count({ where: { username } });
  return count > 0;
}