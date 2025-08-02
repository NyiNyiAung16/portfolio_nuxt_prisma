import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id || "";
        const role = event.context?.user?.role;

        isValidObjectId(id);
        hasUser(event.context?.user);
        isAdmin(event.context?.user);

        if(role !== 'ADMIN') {
            throw createError({
                status:403,
                statusMessage:'Unauthorized'
            })
        }
        
        const project = await prisma.project.delete({
            where: {
                id,
            },
        });

        return project;
    } catch (error: any) {
        throwError(error);
    }    
})