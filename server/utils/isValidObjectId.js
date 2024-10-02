import { ObjectId } from "mongodb";

export const isValidObjectId = (id) => {

    if (!ObjectId.isValid(id)) {
        return false;
    }

    return true;
}