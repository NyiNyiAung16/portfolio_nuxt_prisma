import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;

export default function createToken(user) {
    if (!user) {
        throw new Error('The user object cannot be null or undefined');
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('The JWT secret is not set');
    }

    try {
        return jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: maxAge
        });
    } catch (error) {
        throw new Error('Failed to create token', { cause: error });
    }
}
