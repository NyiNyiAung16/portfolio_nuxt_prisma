import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context?.user?.id;

        if(userId === undefined){
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
        
        const project = await prisma.project.create({
            data: {...body,userId: event.context.user.id}
        });
    
        return project
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.message,
            })
        }
    }
})