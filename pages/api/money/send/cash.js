import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
  
  const { db } = await connectToDatabase();
  
//   verifyJWT(req, res)

  const {phone}  = req.query;

  
  if (req.method === "GET") {

    // if(req.decoded?.user !== email){
    //   return res.status(401).send({message: 'Unauthenticated'});
    // }
    const filter = {mssage:'Hello'}
    res.status(200).json(filter);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
