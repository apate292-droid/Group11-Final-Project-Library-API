import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from '../config/db.js';

export const register = async (req, res) => {
    try {
        const { username, password} = req.body;

        const existingUser = await prisma.user.findUnique({ where: {username}});
        if (existingUser) {
            return res.status(400).json({ error: "Username Already in Use"});
        }

        const hashed = await bcrypt.hash(password, 15);

        const user = await prisma.user.create({
          data: {username, password: hashed},
      });

      return res.status(201).json({
        message: "User Added",
        userId: user.id,
      });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error!"});
    }

};

export const login = async (req, res) => {
    try {
        const { username, password} = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) return res.status(400).json({error: "Invalid credentials"});

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) return res.status(400).json({error: "Invalid credentials"});

        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        return res.status(200).json({ token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
};