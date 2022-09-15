import { MongoClient } from "mongodb";

export const connectionDb = async function () {
  const connectString = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.mcfpfpr.mongodb.net/auth?retryWrites=true&w=majority`;
  return await MongoClient.connect(connectString);
};

export const insertIntoDocument = async function (client, collection, doc) {
  const db = client.db();
  return await db.collection(collection).insertOne(doc);
};
