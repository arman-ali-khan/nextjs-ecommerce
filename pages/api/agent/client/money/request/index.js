import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  
//   verifyJWT(req, res)

  const {email,client}  = req.query;

  
  if (req.method === "GET") {

    // if(req.decoded?.user !== email){
    //   return res.status(401).send({message: 'Unauthenticated'});
    // }
    const filter = {email:client}
    const result = await db.collection("sendMoney").find(filter).sort({_id:-1}).toArray();
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
