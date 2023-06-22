import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  

  if (req.method === "GET") {

 
    const filter = {seen:false}
    const result = await db.collection("notifications").find(filter).toArray();
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
