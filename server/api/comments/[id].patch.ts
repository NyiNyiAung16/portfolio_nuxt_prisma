import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context?.params?.id || "";

    isValidObjectId(id);
    hasUser(event.context?.user);

    const body = await readBody(event);
    const cleanData = await validate(commentSchema, body);

    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...cleanData,
      },
    });

    return comment;
  } catch (error: any) {
    throwError(error);
  }
});
