import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        hasUser(event.context?.user);

        const body = await readBody(event);
        const cleanData = await validate(commentSchema,body);  

        const comment = await prisma.comment.create({
            data: {
                ...cleanData
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
        });

        return comment;
    } catch (error: any) {
        throwError(error);
    }
})