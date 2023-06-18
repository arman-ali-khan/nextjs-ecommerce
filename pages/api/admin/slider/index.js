import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  
//   verifyJWT(req, res)

//   const {email}  = req.query;

  if (req.method === "GET") {

    // if(req.decoded?.email !== email){
    //   return res.status(401).send({message: 'Unauthenticated'});
    // }

    const result = await db.collection("sliders").find({}).sort({_id:-1}).toArray();
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
