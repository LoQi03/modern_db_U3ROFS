import { ObjectId } from "mongodb";

export const toObjectId = (id: string) => new ObjectId(id);
