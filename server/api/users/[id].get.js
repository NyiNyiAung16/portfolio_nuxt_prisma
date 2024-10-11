import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context?.params?.id;

        isValidObjectId(id);
        hasUser(event.context?.user);

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        }); 

        return user;
    } catch (error) {
        throwError(error);
    }    
})