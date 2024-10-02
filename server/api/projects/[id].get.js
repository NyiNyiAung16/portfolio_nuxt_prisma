import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id;

        if(isValidObjectId(id) === false){
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid ID",
            })
        }

        const project = await prisma.project.findUnique({
            where: {
                id
            },
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