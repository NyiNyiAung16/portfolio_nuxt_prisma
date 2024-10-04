import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        
        return users;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusText: error.message,
            })
        }
    }
})