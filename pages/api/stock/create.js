import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const stock = req.body;
    // remove money from user account

    // get old amount
    const user = await db.collection("users").findOne({ email: stock.email });
    const oldAmount = parseFloat(user.balance);
    const totalAmount = parseFloat(stock.total);
    const newBalance = oldAmount - totalAmount;

    const filter = { email: user.email };
    const option = { upsert: true };
    const updateProduct = {
      $set: { balance: newBalance },
    };

    if (stock.total) {
      const updateBalance = await db
        .collection("users")
        .updateOne(filter, updateProduct, option);
      if (updateBalance) {
        const result = await db.collection("stocks").insertOne(stock);
        res.status(200).json(result);
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
