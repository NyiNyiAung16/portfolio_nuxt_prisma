import { ObjectId } from "mongodb";

export const isValidObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid ID",
    });
  }
};
