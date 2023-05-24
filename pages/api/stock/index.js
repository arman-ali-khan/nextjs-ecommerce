import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { email } = req.query;
  const { db } = await connectToDatabase();
  if (req.method === "GET") {
    const filter = { email: email };
    const stocks = await db.collection("stocks").find(filter).toArray();
    res.status(200).send(stocks);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
