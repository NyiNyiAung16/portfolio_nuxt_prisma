import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id || '';

        isValidObjectId(id);
        hasUser(event.context?.user);
        isAdmin(event.context?.user);

        const user = await prisma.user.delete({
            where: {
                id
            }
        });

        return user;
    } catch (error: any) {
        throwError(error);
    }
})