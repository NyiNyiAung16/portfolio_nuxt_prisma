import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id || "";
        
        isValidObjectId(id);
        hasUser(event.context?.user);
        isAdmin(event.context?.user);
        
        const body = await readBody(event);
        const cleanData = await validate(projectSchema,body);

        const project = await prisma.project.update({
            where: {
                id 
            },
            data: cleanData
        });

        return project;
    } catch (error: any) {
        throwError(error);
    }
})