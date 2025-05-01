import clientPromise from "@/app/lib/mongodb";

import { Instructor } from "@/app/models/instructor";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Instructor>("Instructors");

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const item = await collection.findOne({ d_id: new ObjectId(id) });

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}
