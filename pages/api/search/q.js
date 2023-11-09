import { connectToDatabase } from "@/utils/db"; 



export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { title } = req.query;
  const filter = {title :  new RegExp(`.*${title}.*`, 'gi')}
  const posts = await db.collection("products").find(filter).toArray()

  res.status(200).send(posts);
}
