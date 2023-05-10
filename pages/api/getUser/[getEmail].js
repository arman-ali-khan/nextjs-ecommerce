import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const  {getEmail}  = req.query
  const user = await db.collection("users").findOne({email: getEmail});
  res.status(200).send(user);
}
