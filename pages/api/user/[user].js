import { connectToDatabase } from "@/utils/db";




export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const  email  = req.query.email
  console.log(email)
//   const filter = {email: product}
//   const posts = await db.collection("users").findOne(filter);

 // res.status(200).send(posts);
}
