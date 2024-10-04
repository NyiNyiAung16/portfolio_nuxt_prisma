import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/componsables/createToken.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { error } = validation(signUpSchema,body);

    if (error && Object.keys(error).length > 0) {
      throw sendError(
        event,
        createError({
          statusCode: 400,
          statusText: "Validation failed",
          data: error || {},
        })
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      throw createError({
        statusCode: 400,
        statusText: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hash,
        role: "USER",
      },
    });

    const updatedUser = { ...user, password: null };
    const token = createToken(updatedUser);

    await setUserSession(event, {
      user: updatedUser,
      secure: {
        apiToken: token,
      },
      loggedIn: true,
    });

    return {
      user: updatedUser,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: error.statusCode,
        statusText: error.message,
      });
    }
  }
});
