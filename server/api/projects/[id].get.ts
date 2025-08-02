import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id || "";

        isValidObjectId(id);
    
        const project = await prisma.project.findUnique({
            where: {
                id
            },
        });

        return project;
    } catch (error: any) {
        throwError(error);
    }
})