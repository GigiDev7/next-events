import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://gigicho7:gigicho7@cluster0.zstge.mongodb.net/next-events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDoc(client, collection, doc) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(doc);
  return result;
}

export async function getAllDocs(client, collection, sort) {
  const db = client.db();
  const list = await db.collection(collection).find().sort(sort).toArray();

  return list;
}
