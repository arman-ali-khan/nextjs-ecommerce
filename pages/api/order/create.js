import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../jwt/verifyJWT";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  
  verifyJWT(req, res)

  const {email}  = req.query;
  console.log(email)
  
  if (req.method === "POST") {

    if(req.decoded?.user !== email){
      return res.status(200).send({message: 'Unauthenticated'});
    }
    
    const order = req.body;
    const result = await db.collection("orders").insertOne(order);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
