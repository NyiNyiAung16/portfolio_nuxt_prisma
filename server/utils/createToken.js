import jwt from 'jsonwebtoken';

const jwtSecret = useRuntimeConfig().jwtSecret;

const maxAge = 3 * 24 * 60 * 60;

export default function createToken(user) {
    if (!user) {
        throw new Error('The user object cannot be null or undefined');
    }

    if (!jwtSecret) {
        throw new Error('The JWT secret is not set');
    }

    try {
        return jwt.sign({user}, jwtSecret, {
            expiresIn: maxAge
        });
    } catch (error) {
        throw new Error('Failed to create token', { cause: error });
    }
}
