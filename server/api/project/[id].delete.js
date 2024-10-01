export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id;

        const project = await prisma.project.delete({
            where: {
                id : Number(id) 
            },
        });

        return project;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message,
        })
    }    
})