import { z } from "zod";

const projectSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required." }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required." }),
  github_link: z
    .string()
    .trim()
    .min(1, { message: "Github link is required." })
    .url({ message: "Github link must be a valid URL." }),
  demo_link: z
    .string()
    .trim()
    .min(1, { message: "Demo link is required." })
    .url({ message: "Demo link must be a valid URL." }),
  tags: z
    .array(z.string().trim())
    .min(1, { message: "Tag must contain at least one value" }),
  images_path: z
    .array(z.string().trim())
    .min(1, { message: "File must contain at least one value" }),
});

export default projectSchema;
