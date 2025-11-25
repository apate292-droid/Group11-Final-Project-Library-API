import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername, getUserByEmail, getAllUsers, getUserById, updateUser, deleteUser } from '../services/userService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECURE_SECRET_KEY';

export async function getAllUsersHandler(req, res) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  res.status(200).json(user);
}

export async function createUserHandler(req, res) {
  try {
    const { username, email, password, isAdmin } = req.body;

    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUserByEmail = await getUserByEmail(email); 
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = await createUser({ username, email, password, isAdmin });
    const { password: _, ...userWithoutPassword } = newUser; 

    res.status(201).json(userWithoutPassword);

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
}

export async function updateUserHandler(req, res) {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const updatedUser = await updateUser(id, updates);
  res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteUser(id);
  res.status(204).send();
}

export async function loginUserHandler(req, res) {
  try {
    const { identifier, password } = req.body; 
    if (!identifier || !password) 
      return res.status(400).json({ message: "Username/Email and password required. Use 'identifier' and enter either username or email." });

    const isEmail = identifier.includes('@');
    const user = isEmail 
      ? await getUserByEmail(identifier) 
      : await getUserByUsername(identifier);

    if (!user) return res.status(401).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const payload = { id: user.id, role: user.isAdmin ? 'ADMIN' : 'USER' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, role: payload.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}