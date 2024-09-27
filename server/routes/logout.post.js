export default defineEventHandler(async (event) => {
    await clearUserSession(event);

    setResponseStatus(event, 200, 'Session deleted');
})