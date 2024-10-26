import Joi from "joi";

const signUpSchema = Joi.object({
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

const signInSchema = Joi.object({
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

const projectSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),
  youtube_link: Joi.string().required().messages({
    "string.empty": "Youtube link is required.",
  }),
  tags: Joi.array().items(Joi.string().required()).required().messages({
    "array.includesRequiredUnknowns": "Tag must contain at least one value",
    "array.base": "Tags should be an array of strings",
  }),
  images_path: Joi.array().items(Joi.string().required()).required().messages({
    "array.includesRequiredUnknowns": "FIle must contain at least one value",
    "array.base": "Files should be an array of strings",
  }),
});

const userSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  role: Joi.string().valid("ADMIN", "USER").required().messages({
    "string.empty": "Role is required.",
    "any.only": "Role must be either ADMIN or USER",
  }),
});

const commentSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.empty": "Comment is required.",
  }),
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required.",
  }),
  projectId: Joi.string().required().messages({
    "string.empty": "Project ID is required.",
  }),
});



export { signInSchema, signUpSchema, projectSchema, userSchema, commentSchema };