import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const options = {};

let client;
if (process.env.NODE_ENV === "development") {
  if (!globalThis.mongoClient) globalThis.mongoClient = new MongoClient(uri, options);
  client = globalThis.mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export { client };