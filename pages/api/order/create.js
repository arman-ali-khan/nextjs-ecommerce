import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../jwt/verifyJWT";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  verifyJWT(req, res);

  const { email } = req.query;
  console.log(email, req.decoded);

  if (req.method === "POST") {
    if (req.decoded?.email !== email) {
      return res.status(200).send({ message: "Unauthenticated" });
    }

    const order = req.body;
    // order money
    const total = order.total;

    // get user
    const user = await db.collection("users").findOne({ email: email });
    // get exept balance
    const exeptBalance = parseFloat(user.balance) - parseFloat(total);
    // update balance
    const update = await db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          balance: exeptBalance.toFixed(2),
        },
      },
      { upsert: true }
    );
    if (update.acknowledged) {
      const result = await db.collection("orders").insertOne(order);
      await db
        .collection("notifications")
        .insertOne({
          email,
          total,
          order,
          seen: false,
          type: "order",
          agent: user.agent,
        });
      res.status(200).json(result);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
