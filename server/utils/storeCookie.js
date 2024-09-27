import createToken from "~/componsables/createToken";

export const storeCookieHelper = (event, user) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject(new Error("User cannot be null or undefined"));
        }
    
        const token = createToken({ ...user, password: null });
    
        if (!token) {
            reject(new Error("Token cannot be null or undefined"));
        }
    
        setCookie(event, "token", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
    })
};