import clientPromise from "@/app/lib/mongodb";
import { Instructor } from "@/app/models/instructor";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const newItem: Instructor = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Instructor>("Instructors");

    const result = await collection.insertOne(newItem);

    return NextResponse.json({ ...newItem, _id: result.insertedId.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
