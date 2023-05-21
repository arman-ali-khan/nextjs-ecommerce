import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { category } = req.query
  const filter = { categories: { $elemMatch: { value: category } } }
  const posts = await db.collection("products").find(filter).toArray();

  res.status(200).send(posts);
}
