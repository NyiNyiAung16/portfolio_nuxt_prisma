import prisma from "~/lib/prisma"

export default defineEventHandler(async (event)  => {
    try {
        const projectId = event.context?.params?.id;

        isValidObjectId(projectId);

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
        throwError(error);
    }    
})