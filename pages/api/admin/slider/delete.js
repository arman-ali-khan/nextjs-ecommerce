import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "DELETE") {
    const { id } = req.query;
    const objectid = (id)=>{
      return new ObjectId(id)
    }
    const result = await db.collection('sliders').deleteOne({_id: objectid(id)})
    res.status(200).json(result);
    console.log(result);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
