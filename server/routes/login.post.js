import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/server/utils/createToken.js";

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
        statusMessage: "User is not exists.",
      });
    }

    const match = await bcrypt.compare(body.password, user.password);

    if (!match) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password does not match.",
      });
    }

    const updatedUser = { ...user, password: null };

    const token = createToken(updatedUser);

    await setUserSession(event, {
      user: updatedUser,
      loggedIn: true,
    });

    return { ...user, password: null };
  } catch (error) {
    throwError(error);
  }
});
