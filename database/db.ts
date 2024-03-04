import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI)
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );

let client = new MongoClient(URI, options);
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  connectDB = global._mongoClientPromise;
} else {
  connectDB = client.connect();
}

export default connectDB;
