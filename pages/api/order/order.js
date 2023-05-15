import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../jwt/verifyJWT";
import { ObjectId } from "mongodb";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  


  const {id}  = req.query;
  
  if (req.method === "GET") {

    const filter = {id: id}
    const result = await db.collection("orders").findOne(filter)
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
