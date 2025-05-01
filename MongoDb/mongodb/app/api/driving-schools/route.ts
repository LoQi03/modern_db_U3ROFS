import clientPromise from "@/app/lib/mongodb";
import { DrivingSchool } from "@/app/models/driving_school";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<DrivingSchool>("DrivingSchools");

    const items = await collection.find({}).toArray();

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newItem: DrivingSchool = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<DrivingSchool>("DrivingSchools");

    const result = await collection.insertOne(newItem);

    return NextResponse.json({ ...newItem, _id: result.insertedId.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
