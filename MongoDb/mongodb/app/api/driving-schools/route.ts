// app/api/items/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// DrivingSchool interface importálása, ha máshonnan jön
export interface DrivingSchool {
  _id?: string;
  name: string;
  phones: string[];
}

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
