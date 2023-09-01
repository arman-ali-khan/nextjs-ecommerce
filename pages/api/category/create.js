import { connectToDatabase } from "../../../utils/db";
import { verifyJWT } from "../jwt/verifyJWT";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {email} = req.query

  verifyJWT(req, res)
  const user = req.decoded;
  if(user?.email!== email){
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  
  if (req.method === "POST") {
    const category = req.body;
    console.log(category)
    const result = await db.collection("categories").insertOne(category);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
