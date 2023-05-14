import { connectToDatabase } from "../../../utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const { title, content } = req.body;
    const result = await db.collection("posts").insertOne({ title, content });
    const post = result.ops[0];
    res.status(200).json(post);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
