import { ObjectId } from "mongodb";

export interface Instructor {
  _id: ObjectId;
  d_id: ObjectId;
  name: string;
  salary: number;
  phone: string;
}
