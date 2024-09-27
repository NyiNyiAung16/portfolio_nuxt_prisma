import axios from "axios";

export const useAuth = defineStore('auth', () => {
    const { user, session, loggedIn, fetch, clear } = useUserSession();

    const error = ref(null);

    async function login (email, password) {
        error.value = null;

        try {
            const response = await axios.post('/login',{ email, password })
    
            await fetch();
    
            return response;
        } catch (error) {
            error.value = e.response.data.data;
            throw createError({
                statusCode:e.response.status,
                statusMessage: e.response.statusText
            })
        }
    }

    async function register (username, email, password) {
        error.value = null;

        try {
            const response = await axios.post('/register', { username,email,password });

            await fetch();

            return response;
        } catch (e) {
            error.value = e.response.data.data;
            throw createError({
                statusCode:e.response.status,
                statusMessage: e.response.statusText
            })
        }
    }

    return {
        user,
        session,
        loggedIn,
        error,
        login,
        register,
        fetch,
        clear
    }
});



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}