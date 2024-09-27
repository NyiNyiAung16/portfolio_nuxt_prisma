import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import Joi from "joi";
import createToken from "~/componsables/createToken.js";


export default defineEventHandler(async (event) => {
  try {
    // Define your schema
    const schema = Joi.object({
      username: Joi.string().required().messages({
        "string.empty": "Username is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Please provide a valid email address.",
      }),
      password: Joi.string().min(6).max(20).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters.",
        "string.max": "Password cannot exceed 20 characters.",
      }),
    });
    const body = await readBody(event);

    // Validate the data against the schema
    const { error, value } = schema.validate(body, {
      abortEarly: false,
    });

    // Check for validation errors
    if (error) {
      // Initialize an object to store error messages
      const errorMessages = {};

      // Loop through each validation error and populate the errorMessages object
      error.details.forEach((errorDetail) => {
        const field = errorDetail.path[0]; // Get the field name (e.g., 'username', 'email', 'password')

        // Add the error message for the corresponding field
        if (!errorMessages[field]) {
          errorMessages[field] = errorDetail.message;
        }
      });

      throw sendError(event,
        createError({
          statusCode: 400,
          statusMessage: "Validation failed",
          data: errorMessages || {},
        })
      )
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
    
    await setUserSession(event,{
      user: updatedUser,
      secure:{
        apiToken: token
      },
      loggedIn: true
    });

    return {
      user: updatedUser,
    };
  } catch (error) {
    if( error instanceof Error) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
      });
    }
  }
});
