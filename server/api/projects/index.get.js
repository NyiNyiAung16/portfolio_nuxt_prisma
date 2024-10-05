import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context?.user?.id;

        if(!userId) {
            throw createError({
                statusCode: 401,
                statusText: "Unauthorized",
            })
        }

        const page = Number(getQuery(event)?.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;


        const projects = await prisma.project.findMany({
            where: {
                userId  
            },
            orderBy: {
                createdAt: "desc"
            },
            take: limit,
            skip,
        });

        const count = await prisma.project.count({
            where: {
                userId
            }
        });

        const totalPages = Math.ceil(count / limit);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return {
            page,
            data: projects,
            pages,
        };
    } catch (error) {
        if(error instanceof Error) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusText: error.message,
            })
        }
    }
})