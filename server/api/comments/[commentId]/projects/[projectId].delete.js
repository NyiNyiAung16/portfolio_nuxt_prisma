import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context?.user?.id;
        const commentId = event.context?.params?.commentId;
        const projectId = event.context?.params?.projectId;

        if(isValidObjectId(commentId) ===  false && isValidObjectId(projectId) ===  false && isValidObjectId(userId) ===  false) {
            throw createError({
                statusCode: 400,    
                statusMessage: "Invalid ID",
            })
        }

        if(!userId){
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            })
        }

        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
                userId,
                projectId
            }
        });

        return comment;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.message,
            })
        }
    }   
})