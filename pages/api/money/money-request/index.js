import { connectToDatabase } from "@/utils/db";




export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  if (req.method === "POST") {
    const moneyData = req.body;
    const result = await db.collection("moneyRequest").insertOne(moneyData);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
