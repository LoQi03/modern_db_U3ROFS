import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalAny: any = global;
  clientPromise =
    globalAny._mongoClientPromise ||
    (globalAny._mongoClientPromise = client.connect());
} else {
  clientPromise = client.connect();
}

export default clientPromise;
