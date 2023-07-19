import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "GET") {
    const { stock } = req.query;
    const filter = { id: stock };
    const posts = await db.collection("stockProduct").findOne(filter);

    res.status(200).send(posts);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
