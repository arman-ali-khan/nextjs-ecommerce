import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  
  const {email}  = req.query;
  console.log(email)
  
  if (req.method === "GET") {

  
    const filter = {agent:email}
    const result = await db.collection("users").find(filter).sort({name:-1}).toArray();
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}