import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        hasUser(event.context?.user);

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
        throwError(error);
    }
})