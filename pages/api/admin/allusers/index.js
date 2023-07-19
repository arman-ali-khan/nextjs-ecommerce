
import { verifyJWT } from "@/pages/api/jwt/verifyJWT";
import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  verifyJWT(req, res)
  
  const { db } = await connectToDatabase();
  

  const {email}  = req.query;

  console.log(email,req.decoded);
  if (req.method === "GET") {

if(req.decoded){
  if(req.decoded.email !== email){
    return res.status(401).send({message: 'Unauthenticated'});
  }
}
    
    const result = await db.collection("users").find({}).sort({_id:-1}).toArray();
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
