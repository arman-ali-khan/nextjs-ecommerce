import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id, email } = req.query;
  console.log(email);
  //   verifyJWT(req, res)
  //   const user = req.decoded
  //   if(user.user !== email){
  //     return res.status(401).json({
  //       message: "Unauthorized",
  //     });
  //   }

  if (req.method === "PATCH") {
    const { status } = req.body;
    const filter = { id: id };

    if (status === "Delivered") {
      // get order
      const order = await db.collection("orders").findOne(filter);

      const bonus = parseFloat(order.total) - parseFloat(order.originalTotal);

      // get 15 % from
      function getSum(percent, total) {
        return ((total / 100) * percent).toFixed(2);
      }

      const percent15 = parseFloat(getSum(15, bonus));
      // get user
      const user = await db.collection("users").findOne({ email: email });
      // get agent email
      const agentEmail = user.agent;
      // get agent
      const agent = await db.collection("users").findOne({ email: agentEmail });
      // agent balance
      const agentBalance = parseFloat(agent.balance);
      console.log(agentBalance, percent15);
      // update agent balance
      const updateBalance = await db
        .collection("users")
        .updateOne(
          { email: agentEmail },
          { $set: { balance: agentBalance + percent15 } },
          { upsert: true }
        );
      const option = { upsert: true };
      const updateProduct = {
        $set: { status: status },
      };
      if (updateBalance) {
        const result = await db
          .collection("orders")
          .updateOne(filter, updateProduct, option);
        res.status(200).json(result);
      }
    }
    const option = { upsert: true };
    const updateProduct = {
      $set: { status: status },
    };
    const result = await db
      .collection("orders")
      .updateOne(filter, updateProduct, option);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
