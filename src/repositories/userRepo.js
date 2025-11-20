import prisma from '../config/db.js';

export async function getAll() {
  return await prisma.user.findMany({
    orderBy: { id: 'asc' },  
  });
}

export async function getById(id) {
  return await prisma.user.findUnique({
    where: { id },  
  });
}

export async function create(user) {
  const newUser = await prisma.user.create({
    data: user,  
  });
  return newUser;
}

export async function update(id, updates) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },      
      data: updates,      
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null; 
    throw error;  
  }
}

export async function remove(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },  
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;  
    throw error;  
  }
}

export async function exists(id) {
  const result = await prisma.user.count({ where: { id } });
  return result > 0;  
}
export async function existsByUserName(username) {
    const count = await prisma.user.count({ where: { username } });
    return count > 0;
  }
