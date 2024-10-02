import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id;

        if(isValidObjectId(id) ===  false) {
            throw createError({
                statusCode: 400,    
                statusMessage: "Invalid ID",
            })
        }

        const body = await readBody(event);
        const { error } = validation(commentSchema,body);

        if (error && Object.keys(error).length > 0) {
            throw sendError(    
              event,
              createError({
                statusCode: 400,
                statusMessage: "Validation failed",
                data: error || {},
              })    
            );
        }

        const comment = await prisma.comment.update({
            where: {
                id,
            },  
            data: {
                ...body
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