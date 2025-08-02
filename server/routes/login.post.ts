import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import createToken from "~/server/utils/createToken.js";

type Body = {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body: Body = await readBody(event);
    const cleanData: Body = await validate(signInSchema,body);

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

    const { password, ...updatedUser } = user;

    const token = createToken(updatedUser);

    await setUserSession(event, {
      user: updatedUser,
      loggedIn: true,
      secure:{
        apiToken: token,
      }
    });

    return updatedUser;
  } catch (error: any) {
    throwError(error);
  }
});
