import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // verifyJWT(req, res);
  const { email } = req.query;



  if (req.method === "GET") {
    console.log('email',email);
    // if (req.decoded.email === getUser) {
    //   return res.status(401).send({ message: "Unauthenticated" });
    // }  
    const user = await db.collection("users").findOne({ email: email });
    res.status(200).send(user);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
