import prisma from "~/lib/prisma";
import { projectValidation } from "~/server/utils/validation";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id;
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

        const project = await prisma.project.update({
            where: {
                id : Number(id) 
            },
            data: body
        });

        return project;
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message,
        })
    }
})