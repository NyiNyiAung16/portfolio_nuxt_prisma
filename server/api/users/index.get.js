import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const page = Number(getQuery(event)?.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: limit,
            skip,
        });
        
        const count = await prisma.user.count();

        const totalPages = Math.ceil(count / limit);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return {
            page,
            data: users,
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