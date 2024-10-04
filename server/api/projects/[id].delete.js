import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id;
        const userId = event.context?.user?.id;

        if(isValidObjectId(id) === false) {
            throw createError({
                statusCode: 400,
                statusText: "Invalid ID",
            })
        }

        if(!userId){
            throw createError({
                statusCode: 401,
                statusText: "Unauthorized",
            })
        }

        const project = await prisma.project.delete({
            where: {
                id,
                userId
            },
        });

        return project;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                message: error.message,
            })
        }
    }    
})