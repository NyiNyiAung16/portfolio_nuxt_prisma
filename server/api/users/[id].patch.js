import prisma from "~/lib/prisma";
import { signUpValidation } from "~/server/utils/validation";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;

    const body = await readBody(event);
    const { error } = signUpValidation(body);

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

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: body,
    });

    return user;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
});
