import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const page = Number(getQuery(event)?.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: limit,
            skip,
            select: {
                id: true,
                title: true,
                description: true,
                images_path: true,
                createdAt: true
            }
        });

        const count = projects.length;

        const totalPages = Math.ceil(count / limit);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return {
            data: projects,
            pagination: {
                page,
                pages,
            }
        };
    } catch (error: any) {
        throwError(error);
    }
})