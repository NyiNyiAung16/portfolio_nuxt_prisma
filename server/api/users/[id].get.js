import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id;

        if(isValidObjectId(id) === false) {
            throw createError({
                statusCode: 400,    
                statusMessage: "Invalid ID",
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        }); 

        return user;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.message,
            })
        }
    }    
})