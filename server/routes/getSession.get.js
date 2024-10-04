// import { checkToken } from "@utils/checkToken.js";


export default defineEventHandler(async (event) => {
  try{
    const session = await getUserSession(event);
  
    if (!session) {
      throw createError({
        statusCode: 400,
        statusText: 'Session is invalid'
      })
    }

    return session;
  }catch(e){
    throw createError({
      statusCode: e.statusCode,
      statusText:  e.message
    })
  }
});
