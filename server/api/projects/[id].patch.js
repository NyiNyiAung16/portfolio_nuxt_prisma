import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id;
        const userId = event.context?.user?.id;
        
        if(isValidObjectId(id) === false) {
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
        
        const body = await readBody(event);
        const { error } = validation(projectSchema,body);

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

        const project = await prisma.project.update({
            where: {
                id ,
                userId
            },
            data: body
        });

        return project;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.message,
            })
        }
    }
})