import { ObjectId } from "mongodb";

export interface DrivingSchool {
  _id: ObjectId;
  name: string;
  phone: string;
  address: string;
}
