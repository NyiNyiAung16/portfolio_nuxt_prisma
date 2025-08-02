import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id || '';

    isValidObjectId(id);
    hasUser(event.context?.user);
    isAdmin(event.context?.user);

    const body = await readBody(event);
    const cleanData = await validate(userSchema,body);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {...cleanData},
      select: {
        password: false
      }
    });

    return user;
  } catch (error: any) {
    throwError(error);
  }
});
