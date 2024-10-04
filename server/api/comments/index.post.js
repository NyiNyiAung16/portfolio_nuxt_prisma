import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {

        const body = await readBody(event);
        const { error } = validation(commentSchema,body);

        if (error && Object.keys(error).length > 0) {
            throw sendError( 
              event,
              createError({
                statusCode: 400,
                statusText: "Validation failed",
                data: error || {},
              })    
            );
        }   

        const comment = await prisma.comment.create({
            data: {
                ...body
            }
        });

        return comment;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusText: error.message,
            })
        }
    }
})