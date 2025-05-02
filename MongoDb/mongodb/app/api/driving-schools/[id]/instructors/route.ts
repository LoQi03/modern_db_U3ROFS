import clientPromise from "@/app/lib/mongodb";

import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export interface InstructorDetailsDto{
  _id: string;
  d_id: string;
  name: string;
  salary: number;
  phone: string;
  customersCount: number
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("Instructors");

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const results = await collection.aggregate([
      {
        $match: {
          d_id: new ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "Customers",
          localField: "_id",
          foreignField: "i_id",
          as: "customers"
        }
      },
      {
        $project: {
          _id: 1,
          d_id: 1,
          name: 1,
          salary: 1,
          phone: 1,
          customersCount: { $size: "$customers" }
        }
      }
    ]).toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('helló')
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("Instructors");

    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid search query" },
        { status: 400 }
      );
    }

    const results = await collection.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: "Helo",
            path: { wildcard: "*" },
            fuzzy: {
              maxEdits: 2,    
              prefixLength: 1  
            }
          }
        }
      },
      {
        $lookup: {
          from: "Customers",
          localField: "_id",
          foreignField: "i_id",
          as: "customers"
        }
      },
      {
        $project: {
          _id: 1,
          d_id: 1,
          name: 1,
          salary: 1,
          phone: 1,
          customersCount: { $size: "$customers" },
          score: { $meta: "searchScore" } 
        }
      }
    ]).toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to perform fuzzy search" },
      { status: 500 }
    );
  }
}
