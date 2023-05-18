import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const {id} = req.query
    const product = req.body;
    const filter = { id: id };
    const option = { upsert: true };
    const updateProduct = {
      $set: product,
    };
   
    const result = await db
      .collection("products")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
