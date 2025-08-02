import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const commentId = event.context?.params?.id || "";

        isValidObjectId(commentId);
        hasUser(event.context?.user);

        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            }
        });

        return comment;
    } catch (error: any) {
        throwError(error);
    }   
})