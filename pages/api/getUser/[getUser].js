import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../jwt/verifyJWT";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const  {getUser}  = req.query
  verifyJWT(req, res);
  if(req.user !== getUser){
    return res.status(401)
  }
  const user = await db.collection("users").findOne({email: getUser});
  res.status(200).send(user);
}
