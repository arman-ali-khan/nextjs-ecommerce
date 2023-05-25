import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
    const {page}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  const allFiles = await db.collection("products").find({}).skip(parseInt(page)*5).limit(5).toArray();
  const count = await db.collection("products").estimatedDocumentCount()
  res.status(200).send({count,allFiles});
}
