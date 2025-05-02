import { ObjectId } from "mongodb";

export interface Customer {
  _id: ObjectId;
  i_id: ObjectId;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthDate: Date;
}
