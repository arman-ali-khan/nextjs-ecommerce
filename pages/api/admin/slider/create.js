import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  if (req.method === "POST") {
    const slider = req.body;
    const result = await db.collection("sliders").insertOne(slider);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
