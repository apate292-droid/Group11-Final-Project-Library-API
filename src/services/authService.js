import bcrypt from "bcrypt";
import jst from 'jsonwebtoken';
import { create, getById } from '../repositories/userRepo';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export function signUp(email, password) {}


export async function logIn(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        const error = new Error('Invalid Entry');
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid Entry');
        error.status = 401;
        throw error;
    }

    const accessToken = jst.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return accessToken;
    
    
}