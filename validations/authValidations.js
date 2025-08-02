import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email Address is required." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(32, { message: "Password must not exceed 32 characters." }),
});



const registerSchema = z.object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .trim()
      .email({ message: "Email Address is required." }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(32, { message: "Password must not exceed 32 characters." }),
});


export { loginSchema, registerSchema };