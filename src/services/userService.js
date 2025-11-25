import bcrypt from 'bcrypt';
import { getAll, getById, create, update, remove, getByUserName, getByEmail } from '../repositories/userRepo.js';

export async function getAllUsers() {
  return getAll();
}

export async function getUserByUsername(username) {
  return getByUserName(username);
}

export async function getUserByEmail(email) {
    return await getByEmail(email);
}

export async function getUserById(id) {
  const user = await getById(id);
  if (!user) {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
  return user;
}

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return create({
    username: data.username,
    password: hashedPassword,
    email: data.email,
    isAdmin: data.isAdmin,
  });
}

export async function updateUser(id, data) {
  const user = await update(id, data);
  if (!user) {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
  return user;
}

export async function deleteUser(id) {
  const user = await remove(id);
  if (!user) {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
  return true;
}