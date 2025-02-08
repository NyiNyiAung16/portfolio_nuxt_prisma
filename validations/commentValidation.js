import { z } from "zod";


const commentSchema = z.object({
    content: z.string().trim().min(1,{ message: "Comment is required."}).max(255),
    userId: z.string(),
    projectId: z.string(),
});

export default commentSchema;