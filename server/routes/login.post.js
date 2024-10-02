import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/componsables/createToken.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { error } = validation(signInSchema,body);

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

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "User is not exists",
      });
    }

    const match = await bcrypt.compare(body.password, user.password);

    if (!match) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password does not match",
      });
    }

    const updatedUser = { ...user, password: null };

    const token = createToken(updatedUser);

    await setUserSession(event, {
      user: updatedUser,
      secure: {
        apiToken: token,
      },
      loggedIn: true,
    });

    return { ...user, password: null };
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
      });
    }
  }
});
