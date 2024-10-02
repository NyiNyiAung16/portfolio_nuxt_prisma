import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const projects = await prisma.project.findMany();
        
        return projects;
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.message,
            })
        }
    }
})