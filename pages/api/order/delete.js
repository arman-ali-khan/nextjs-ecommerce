import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id, email } = req.query;

  //   verifyJWT(req, res)
  //   const user = req.decoded;
  //   if(user.user !== email){
  //     return res.status(401).json({
  //       message: "Unauthorized",
  //     });
  //   }

  //   console.log(user,email)

  if (req.method === "DELETE") {
    // get order by id
    const order = await db.collection("orders").findOne({ id: id });
    if (order.status === "Processing") {
      // get amount
      const amount = order.total;
      // get user by email
      const user = await db.collection("users").findOne({ email: email });
      const userBalance = parseFloat(user.balance);
      // user new balance
      const userNewBalance = userBalance + parseFloat(amount);

      // update user balance
      const updateUser = await db
        .collection("users")
        .updateOne(
          { email: email },
          { $set: { balance: userNewBalance } },
          { upsert: true }
        );

      if (updateUser) {
        const result = await db.collection("orders").deleteOne({ id: id });
        res.status(200).json(result);
      }
    }
    const result = await db.collection("orders").deleteOne({ id: id });
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
