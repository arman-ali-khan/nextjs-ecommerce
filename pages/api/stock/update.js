import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../jwt/verifyJWT";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {id,email} = req.query
  verifyJWT(req, res)
  const user = req.decoded
  if(user.email !== email){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.method === "PUT") {
    const product = req.body;
    const filter = { id: id };
    const option = { upsert: true };
    const updateProduct = {
      $set: product,
    };
   
    const result = await db
      .collection("stocks")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
