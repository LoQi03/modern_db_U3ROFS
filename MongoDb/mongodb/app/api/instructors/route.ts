import clientPromise from "@/app/lib/mongodb";
import { Instructor } from "@/app/models/instructor";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export interface CreateInstructor {
  d_id: string;
  name: string;
  salary: number;
  phone: string;
}

export async function POST(req: Request) {
  try {
    const data: CreateInstructor = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const newItem: Instructor = {
      _id: new ObjectId(),
      d_id: new ObjectId(data.d_id),
      name: data.name,
      salary: data.salary,
      phone: data.phone,
    };

    const collection = db.collection<Instructor>("Instructors");

    const result = await collection.insertOne(newItem);

    return NextResponse.json({ ...newItem, _id: result.insertedId.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
