import { z } from "zod";


const projectSchema = z.object({
    title: z.string().trim().min(1, { message: "Title is required." }),
    description: z.string().trim().min(1, { message: "Description is required." }),
    youtube_link: z.string().trim().min(1, { message: "Youtube link is required." }),    
    tags: z.array(z.string().trim()).min(1, { message: "Tag must contain at least one value" }),
    images_path: z.array(z.string().trim()).min(1, { message: "File must contain at least one value" }),
});

export default projectSchema;