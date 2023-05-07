import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";



export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { product } = req.query
  const filter = {id: product}
  const posts = await db.collection("products").findOne(filter);

  res.status(200).send(posts);
}
