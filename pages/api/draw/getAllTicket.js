import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {email,drawId} = req.query;
  


  if (req.method === "GET") {
    if(drawId){
      const result = await db.collection("newDrawResults").find({draw:drawId}).sort({_id:-1}).toArray();
      res.status(200).json(result);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
