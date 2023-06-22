import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // verifyJWT(req, res);
  const { getUser } = req.query;

  // console.log(req.decoded)
  console.log(getUser);

  if (req.method === "GET") {
    // if (req.decoded.email === getUser) {
    //   return res.status(401).send({ message: "Unauthenticated" });
    // }  
    const user = await db.collection("users").findOne({ email: getUser });
    res.status(200).send(user);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
