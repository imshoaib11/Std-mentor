import { MongoClient } from "mongodb";
import "dotenv/config.js"

const url = process.env.MONGODB_URL

export const dbName = "student-mentor"
export const client = new MongoClient(url)