import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {id} = req.query
//   verifyJWT(req, res)
//   const user = req.decoded
//   if(user.user !== email){
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }

  if (req.method === "PATCH") {
   

    const objectid = (id)=> {
        return new ObjectId(id)
    }

    const filter = { _id: objectid(id) };
    const option = { upsert: true };
    const updateProduct = {
      $set: {seen:true},
    };
   
    const result = await db
      .collection("notifications")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
