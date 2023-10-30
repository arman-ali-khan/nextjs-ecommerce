import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {id} = req.query;
console.log(id)

  if (req.method === "DELETE") {
    const result = await db.collection("draws").deleteOne({id:id});
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
