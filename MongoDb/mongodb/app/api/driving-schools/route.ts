import clientPromise from "@/app/lib/mongodb";
import { DrivingSchool } from "@/app/models/driving_school";
import { NextResponse } from "next/server";

export interface DrivingSchoolDetailsDto{
  _id: string;
  name: string;
  phone: string;
  address: string;
  instructorCount: number
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("DrivingSchools");

    const results = await collection.aggregate([
      {
        $lookup: {
          from: "Instructors",
          localField: "_id",
          foreignField: "d_id",
          as: "instructors"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          phone: 1,
          address: 1,
          instructorCount: { $size: "$instructors" }
        }
      }
    ]).toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch driving schools" },
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
