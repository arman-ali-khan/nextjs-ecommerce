import { connectToDatabase } from "@/utils/db";

  export default async function handler(req, res) {
    const { db } = await connectToDatabase();
   
    if (req.method === "PUT") {
        const {email}  = req.query;
        const { exeptBalance } = req.body;
        console.log(email,exeptBalance)

       const filter = { email: email };
    const option = { upsert: true };
    const updateProduct = {
      $set: {balance:exeptBalance},
    };
   
    const result = await db
      .collection("users")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }