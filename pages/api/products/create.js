import { connectToDatabase } from "../../../utils/db";
import { verifyJWT } from "../jwt/verifyJWT";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  if (req.method === "POST") {
    const product = req.body;
    const result = await db.collection("products").insertOne(product);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
