import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/componsables/createToken.js";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cleanData = await validate(signInSchema,body);

    const user = await prisma.user.findUnique({
      where: {
        email: cleanData.email,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        statusText: "User is not exists",
      });
    }

    const match = await bcrypt.compare(body.password, user.password);

    if (!match) {
      throw createError({
        statusCode: 400,
        statusText: "Password does not match",
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
    throwError(error);
  }
});
