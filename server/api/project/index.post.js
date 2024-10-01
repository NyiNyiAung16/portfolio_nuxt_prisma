import prisma from "~/lib/prisma";
import { projectValidation } from "~/server/utils/validation";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { error } = projectValidation(body);

        if (error && Object.keys(error).length > 0) {
            throw sendError(
              event,
              createError({
                statusCode: 400,
                statusMessage: "Validation failed",
                data: error || {},
              })
            );
        }
        
        const project = await prisma.project.create({
            data: {...body,userId: event.context.user.id}
        });
    
        return project
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message,
        })
    }
})