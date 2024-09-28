import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/componsables/createToken.js";
import { signUpValidation } from "../utils/validation.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { error } = signUpValidation(body);

    if (Object.keys(error).length > 0) {
      throw sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Validation failed",
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
        statusMessage: "User already exists",
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
        statusMessage: error.message,
      });
    }
  }
});
