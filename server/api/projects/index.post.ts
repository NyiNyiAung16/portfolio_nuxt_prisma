import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        hasUser(event.context?.user);
        isAdmin(event.context?.user);

        const body = await readBody(event);
        const cleanData = await validate(projectSchema,body);
        
        const project = await prisma.project.create({
            data: {...cleanData,userId: event.context?.user?.id}
        });
    
        return project
    } catch (error: any) {
        throwError(error);
    }
})