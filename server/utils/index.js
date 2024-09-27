import jwt from 'jsonwebtoken';

/**
 * Checks if a given token is valid.
 *
 * @param {string} token The token to check
 * @returns {Promise<import('jsonwebtoken').JwtPayload>} The decoded token payload if the token is valid, otherwise a rejected promise
 */
export function checkToken(token) {
    if (!token) {
        return Promise.reject(new Error('The token must not be null or empty'));
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(error);
            } else if (!decoded) {
                reject(new Error('The token is invalid'));
            } else {
                resolve(decoded);
            }
        });
    });
}

