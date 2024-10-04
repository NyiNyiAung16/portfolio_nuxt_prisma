import prisma from "~/lib/prisma"

export default defineEventHandler(async (event)  => {
    try {
        const projectId = event.context?.params?.id;

        if(isValidObjectId(projectId) === false) {
            throw createError({
                statusCode: 400,    
                statusText: "Invalid ID",
            })
        }

        const comments = await prisma.comment.findMany({
            where: {
                projectId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return comments;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode,
                statusText: error?.message
            })
        }
    }    
})