import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../../jwt/verifyJWT";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  verifyJWT(req, res);

  const { email } = req.query;
  console.log(email);
  if (req.decoded.email !== email) {
    return res.status(401).send({ message: "Unauthenticated" });
  } else {
    if (req.method === "POST") {
      const sendData = req.body;
      // order money
      const sendmoney = parseFloat(sendData.amount);

      // recipient
      const recipient = sendData.recipient;
      // recipient old balance
      const recipientOldBalance = parseFloat(recipient.balance);
      // recipient new balance
      const recipientNewBalance = sendmoney + parseFloat(recipient.balance);
      // recipient email
      const email = recipient.email;
      // sender email
      const senderEmail = sendData.senderEmail;

      // // get user
      const user = await db.collection("users").findOne({ email: email });

      if (sendData.type !== "in") {
        if (senderEmail) {
          // update balance
          await db.collection("users").updateOne(
            { email: email },
            {
              $set: {
                balance: recipientNewBalance,
              },
            },
            { upsert: true }
          );

          // update sender balance

          // sender balance
          const sender = await db
            .collection("users")
            .findOne({ email: senderEmail });

          // sender balance
          const senderNewBalance = parseFloat(sender.balance) - sendmoney;

          await db.collection("users").updateOne(
            { email: senderEmail },
            {
              $set: {
                balance: senderNewBalance,
              },
            },
            { upsert: true }
          );
        }
      }
      const result = await db.collection("sendMoney").insertOne(sendData);

      await db.collection("notifications").insertOne({
        type: "send",
        name: sendData.sender,
        amount: sendData.amount,
        email: sendData.senderEmail,
        agent: sendData.recipient.email,
        seen: false,
      });
      res.status(200).json(result);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
