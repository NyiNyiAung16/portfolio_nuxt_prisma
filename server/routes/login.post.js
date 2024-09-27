import prisma from "~/lib/prisma"
import bcrypt from 'bcrypt'
import createToken from "~/componsables/createToken.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if(!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User is not exists'
        })
    }

    const match = await bcrypt.compare(body.password, user.password);
    if(!match) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password does not match'
        })
    }

    const updatedUser = {...user, password: null};

    const token = createToken(updatedUser);

    await setUserSession(event,{
        user: updatedUser,
        secure:{
          apiToken: token
        },
        loggedIn: true
    });
  

    return {...user, password: null}
})