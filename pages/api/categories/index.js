import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  
  const categories = await db.collection("categories").find({}).toArray();
  res.status(200).send(categories);
}
