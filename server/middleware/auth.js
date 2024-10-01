export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event);
    if(user && Object.keys(user).length > 0){
        event.context.user = user;
    }
})