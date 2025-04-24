import { NextApiRequest, NextApiResponse } from "next";
import { WithId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";

export interface DrivingSchool {
  id?: string;
  name: string;
  phone: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("mydb");
  const collection = db.collection<DrivingSchool>("driving_schools");

  switch (req.method) {
    case "GET": {
      const schools: WithId<DrivingSchool>[] = await collection
        .find()
        .toArray();
      const formatted = schools.map((s) => ({
        id: s._id.toString(),
        name: s.name,
        phone: s.phone,
      }));
      return res.status(200).json(formatted);
    }
    case "POST": {
      const { name, phone } = req.body;

      if (!name || !Array.isArray(phone)) {
        return res
          .status(400)
          .json({ error: "Missing or invalid name or phone" });
      }

      const newSchool: DrivingSchool = { name, phone };
      const result = await collection.insertOne(newSchool);
      return res.status(201).json({ id: result.insertedId.toString() });
    }
    default:
      return res.status(405).end();
  }
}
