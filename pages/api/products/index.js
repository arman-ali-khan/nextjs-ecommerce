import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
    const tag = req.query.tag;
    const page  = parseInt(req.query.page);
    const size = parseInt(req.query.size);
  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  const allFiles = await db.collection("products").find({}).toArray();
  const count = await db.collection("products").estimatedDocumentCount()
  res.status(200).send({count,allFiles});
}
