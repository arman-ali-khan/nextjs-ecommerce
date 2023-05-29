import { connectToDatabase } from "../../../utils/db";
import { verifyJWT } from "../jwt/verifyJWT";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {id,email} = req.query
  
  verifyJWT(req, res)
  const user = req.decoded;
  if(user.user !== email){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }


  if (req.method === "DELETE") {
    const result = await db.collection("products").deleteOne({ id: id });
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
