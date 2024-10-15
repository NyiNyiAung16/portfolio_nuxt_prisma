import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/componsables/createToken.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cleanData = await validate(signUpSchema,body);


    const userExists = await prisma.user.findUnique({
      where: {
        email: cleanData.email,
      },
    });

    if (userExists) {
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(cleanData.password, salt);

    const user = await prisma.user.create({
      data: {
        username: cleanData.username,
        email: cleanData.email,
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
    throwError(error);
  }
});
