// app/api/items/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise; // Kapcsolódás MongoDB-hez
    const db = client.db(); // A MongoDB adatbázis elérése
    const collection = db.collection("items");
    const items = await collection.find({}).toArray();

    return NextResponse.json(items); // Válasz visszaküldése
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
    const newItem = await req.json(); // Új item adat lekérése a kérésből
    const client = await clientPromise; // Kapcsolódás MongoDB-hez
    const db = client.db(); // Adatbázis elérése
    const collection = db.collection("items");

    const result = await collection.insertOne(newItem); // Új item hozzáadása
    return NextResponse.json({ ...newItem, _id: result.insertedId }); // Válasz visszaküldése
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
