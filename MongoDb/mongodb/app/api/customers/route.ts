import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { Customer } from "@/app/models/customer";

export interface CreateCustomer {
  i_id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthDate: string;
}

export async function POST(req: Request) {
  try {
    const data: CreateCustomer = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const newCustomer: Customer = {
      _id: new ObjectId(),
      i_id: new ObjectId(data.i_id),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      birthDate: new Date(data.birthDate),
    };

    const collection = db.collection<Customer>("Customers");
    const result = await collection.insertOne(newCustomer);

    return NextResponse.json({
      ...newCustomer,
      _id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add customer" },
      { status: 500 }
    );
  }
}
