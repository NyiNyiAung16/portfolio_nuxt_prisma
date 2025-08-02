export default defineEventHandler(async (event) => {
    try {
        await clearUserSession(event);
    
        setResponseStatus(event, 200, 'Session deleted');
    } catch (error: any) {
        throwError(error);
    }
})