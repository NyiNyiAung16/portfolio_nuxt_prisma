import { z } from "zod";


export const userSchema = z.object({
    username: z.string().trim().min(3, { message: "Username must be at least 3 characters long." }),
    email: z.string().trim().email({ message: "Email Address is required." }),
    role: z.string().trim().nonempty({ message: "Role is required." }),
})