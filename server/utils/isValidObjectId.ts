import { ObjectId } from "bson";

export const isValidObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid ID",
    });
  }
  return true;
};
